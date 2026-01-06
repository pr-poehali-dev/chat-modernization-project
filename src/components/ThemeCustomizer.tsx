import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const ThemeCustomizer = () => {
  const { theme, toggleTheme, customColors, presets, applyPreset } = useTheme();

  return (
    <Card className="border-border/50 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon name="Palette" size={18} className="text-primary" />
          Темы оформления
        </CardTitle>
        <CardDescription className="text-xs">
          Настройте внешний вид под себя
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name={theme === 'dark' ? 'Moon' : 'Sun'} size={16} />
            <span className="text-sm">{theme === 'dark' ? 'Темная' : 'Светлая'}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleTheme}
            className="hover-scale"
          >
            <Icon name="Repeat" size={14} className="mr-1" />
            Переключить
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold">Цветовые пресеты</p>
          <ScrollArea className="h-48">
            <div className="space-y-2 pr-2">
              {presets.map((preset, index) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset.name)}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary transition-all hover-scale text-left animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{preset.name}</span>
                    {customColors.primary === preset.colors.primary && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        Активно
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="w-8 h-8 rounded-md"
                      style={{ background: preset.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-md"
                      style={{ background: preset.colors.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded-md"
                      style={{ background: preset.colors.accent }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 text-xs flex items-start gap-2">
          <Icon name="Sparkles" size={14} className="text-primary mt-0.5" />
          <div>
            <p className="font-medium mb-1">Умная тема</p>
            <p className="text-muted-foreground">
              Автоматически меняется в зависимости от времени суток
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomizer;
