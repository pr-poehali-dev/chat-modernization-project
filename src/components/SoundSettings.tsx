import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { soundSystem, SoundCategory } from '@/utils/soundNotifications';
import { useState } from 'react';

const CATEGORIES: Array<{ id: SoundCategory; name: string; icon: string; color: string }> = [
  { id: 'urgent', name: 'Срочные', icon: 'AlertCircle', color: 'text-orange-500' },
  { id: 'work', name: 'Работа', icon: 'Briefcase', color: 'text-blue-500' },
  { id: 'family', name: 'Семья', icon: 'Heart', color: 'text-pink-500' },
  { id: 'games', name: 'Игры', icon: 'Gamepad2', color: 'text-purple-500' },
];

const SoundSettings = () => {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = (value: boolean) => {
    setEnabled(value);
    soundSystem.setEnabled(value);
  };

  const playSound = (category: SoundCategory) => {
    soundSystem.play(category);
  };

  return (
    <Card className="border-border/50 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon name="Volume2" size={18} className="text-primary" />
          Звуковые уведомления
        </CardTitle>
        <CardDescription className="text-xs">
          Уникальные звуки для каждой категории
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name={enabled ? 'Volume2' : 'VolumeX'} size={16} />
            <span className="text-sm">{enabled ? 'Включено' : 'Выключено'}</span>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold mb-3">Тестирование звуков</p>
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${category.color}`}>
                    <Icon name={category.icon as any} size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {soundSystem.getSoundName(category.id)}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => playSound(category.id)}
                  disabled={!enabled}
                  className="hover-scale"
                >
                  <Icon name="Play" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-accent/10 rounded-lg p-3 text-xs flex items-start gap-2">
          <Icon name="Sparkles" size={14} className="text-accent mt-0.5" />
          <div>
            <p className="font-medium mb-1">Адаптивная громкость</p>
            <p className="text-muted-foreground">
              Звук автоматически подстраивается под окружение
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoundSettings;
