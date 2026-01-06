type SoundCategory = 'family' | 'work' | 'games' | 'urgent';

interface SoundConfig {
  frequency: number;
  duration: number;
  pattern: number[];
  volume: number;
}

const SOUND_PROFILES: Record<SoundCategory, SoundConfig> = {
  family: {
    frequency: 523.25,
    duration: 0.15,
    pattern: [0, 0.2, 0.4],
    volume: 0.3
  },
  work: {
    frequency: 659.25,
    duration: 0.1,
    pattern: [0, 0.15],
    volume: 0.4
  },
  games: {
    frequency: 783.99,
    duration: 0.2,
    pattern: [0, 0.1, 0.2, 0.3],
    volume: 0.35
  },
  urgent: {
    frequency: 880.0,
    duration: 0.3,
    pattern: [0, 0.2, 0.4, 0.6],
    volume: 0.5
  }
};

class SoundNotificationSystem {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  async play(category: SoundCategory) {
    if (!this.enabled || !this.audioContext) return;

    const config = SOUND_PROFILES[category];
    const { frequency, duration, pattern, volume } = config;

    for (const delay of pattern) {
      await this.playTone(frequency, duration, volume, delay);
    }
  }

  private playTone(frequency: number, duration: number, volume: number, delay: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.audioContext) {
          resolve();
          return;
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);

        oscillator.onended = () => resolve();
      }, delay * 1000);
    });
  }

  getSoundName(category: SoundCategory): string {
    const names: Record<SoundCategory, string> = {
      family: '🎵 Мягкий колокольчик',
      work: '🔔 Короткий сигнал',
      games: '🎮 Игровой бип',
      urgent: '⚡ Срочный тревожный'
    };
    return names[category];
  }
}

export const soundSystem = new SoundNotificationSystem();
export type { SoundCategory };
