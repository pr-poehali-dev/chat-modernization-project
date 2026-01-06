import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface CustomColors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  customColors: CustomColors;
  setCustomColors: (colors: Partial<CustomColors>) => void;
  presets: Array<{ name: string; colors: CustomColors }>;
  applyPreset: (preset: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const COLOR_PRESETS = [
  {
    name: 'Purple Dreams',
    colors: {
      primary: '#9b87f5',
      secondary: '#D946EF',
      accent: '#0EA5E9'
    }
  },
  {
    name: 'Ocean Breeze',
    colors: {
      primary: '#06B6D4',
      secondary: '#0EA5E9',
      accent: '#8B5CF6'
    }
  },
  {
    name: 'Sunset Glow',
    colors: {
      primary: '#F97316',
      secondary: '#FB923C',
      accent: '#EC4899'
    }
  },
  {
    name: 'Forest Mint',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#6366F1'
    }
  },
  {
    name: 'Rose Gold',
    colors: {
      primary: '#EC4899',
      secondary: '#F472B6',
      accent: '#FBBF24'
    }
  }
];

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  const [customColors, setCustomColorsState] = useState<CustomColors>(() => {
    const saved = localStorage.getItem('customColors');
    return saved ? JSON.parse(saved) : COLOR_PRESETS[0].colors;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    root.style.setProperty('--primary', hexToHSL(customColors.primary));
    root.style.setProperty('--secondary', hexToHSL(customColors.secondary));
    root.style.setProperty('--accent', hexToHSL(customColors.accent));
    
    localStorage.setItem('customColors', JSON.stringify(customColors));
  }, [customColors]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setCustomColors = (colors: Partial<CustomColors>) => {
    setCustomColorsState(prev => ({ ...prev, ...colors }));
  };

  const applyPreset = (presetName: string) => {
    const preset = COLOR_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setCustomColorsState(preset.colors);
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      customColors,
      setCustomColors,
      presets: COLOR_PRESETS,
      applyPreset
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
