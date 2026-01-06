import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import ThemeCustomizer from './ThemeCustomizer';
import SoundSettings from './SoundSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeCustomizer from './ThemeCustomizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  gradient: string;
  enabled: boolean;
}

const FEATURES: Feature[] = [
  {
    id: 'smart-sort',
    title: 'Умная сортировка',
    description: 'Автоматическая группировка чатов по темам и важности',
    icon: 'Brain',
    category: 'Продуктивность',
    gradient: 'gradient-purple',
    enabled: true
  },
  {
    id: 'temp-roles',
    title: 'Временные роли',
    description: 'Назначайте модераторов на определенное время',
    icon: 'Clock',
    category: 'Управление',
    gradient: 'gradient-blue',
    enabled: true
  },
  {
    id: 'offline-mode',
    title: 'Офлайн с приоритетами',
    description: 'Отмечайте срочность сообщений в зоне без сети',
    icon: 'Wifi',
    category: 'Связь',
    gradient: 'gradient-orange',
    enabled: false
  },
  {
    id: 'self-destruct',
    title: 'Самоуничтожающиеся чаты',
    description: 'Сообщения исчезают после подтверждения просмотра',
    icon: 'Shield',
    category: 'Безопасность',
    gradient: 'gradient-purple',
    enabled: true
  },
  {
    id: 'voice-avatar',
    title: 'Голосовые аватары',
    description: 'ИИ генерирует голос с разными интонациями',
    icon: 'Mic',
    category: 'Развлечения',
    gradient: 'gradient-blue',
    enabled: false
  },
  {
    id: 'ar-masks',
    title: 'AR-маски',
    description: 'Интерактивные маски для видеозвонков',
    icon: 'Smile',
    category: 'Развлечения',
    gradient: 'gradient-orange',
    enabled: true
  },
  {
    id: 'ai-secretary',
    title: 'AI-секретарь',
    description: 'Пересказ диалогов и напоминания о задачах',
    icon: 'Sparkles',
    category: 'Продуктивность',
    gradient: 'gradient-purple',
    enabled: true
  },
  {
    id: 'shared-view',
    title: 'Совместный просмотр',
    description: 'Смотрите видео и рисуйте метки вместе',
    icon: 'Eye',
    category: 'Коммуникация',
    gradient: 'gradient-blue',
    enabled: false
  },
  {
    id: 'game-chats',
    title: 'Игровые чаты',
    description: 'Мини-игры с таблицей лидеров в группах',
    icon: 'Gamepad2',
    category: 'Развлечения',
    gradient: 'gradient-orange',
    enabled: false
  },
  {
    id: 'analytics',
    title: 'Аналитика чатов',
    description: 'Статистика активности и карта интересов',
    icon: 'BarChart3',
    category: 'Бизнес',
    gradient: 'gradient-purple',
    enabled: true
  },
];

interface FeaturePanelProps {
  onClose: () => void;
}

const FeaturePanel = ({ onClose }: FeaturePanelProps) => {
  const [features, setFeatures] = useState(FEATURES);

  const toggleFeature = (id: string) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="w-96 border-l border-border bg-card animate-slide-in-right">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Фишки мессенджера
          </h2>
          <p className="text-xs text-muted-foreground">Инновационные возможности</p>
        </div>
        <Button size="icon" variant="ghost" onClick={onClose} className="hover-scale">
          <Icon name="X" />
        </Button>
      </div>

      <Tabs defaultValue="features" className="h-[calc(100vh-5rem)]">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="features" className="text-xs">Функции</TabsTrigger>
          <TabsTrigger value="themes" className="text-xs">Темы</TabsTrigger>
          <TabsTrigger value="sounds" className="text-xs">Звуки</TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="h-[calc(100vh-10rem)] m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ThemeCustomizer />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sounds" className="h-[calc(100vh-10rem)] m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <SoundSettings />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="features" className="h-[calc(100vh-10rem)] m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
          {categories.map(category => (
            <div key={category}>
              <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                {category}
              </h3>
              
              <div className="space-y-3">
                {features
                  .filter(f => f.category === category)
                  .map((feature, index) => (
                    <Card 
                      key={feature.id} 
                      className="hover-scale transition-all animate-fade-in border-border/50"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${feature.gradient} flex items-center justify-center`}>
                              <Icon name={feature.icon as any} className="text-white" size={20} />
                            </div>
                            <div>
                              <CardTitle className="text-sm">{feature.title}</CardTitle>
                              <Badge 
                                variant="outline" 
                                className={`text-xs mt-1 ${feature.enabled ? 'border-primary text-primary' : 'border-muted-foreground/30'}`}
                              >
                                {feature.enabled ? '✓ Активно' : 'Отключено'}
                              </Badge>
                            </div>
                          </div>
                          <Switch 
                            checked={feature.enabled}
                            onCheckedChange={() => toggleFeature(feature.id)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <CardDescription className="text-xs">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon name="Zap" className="text-primary" size={18} />
                    Скоро
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Globe" size={14} className="text-accent" />
                    <span>Языковой мост (автоперевод)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Volume2" size={14} className="text-accent" />
                    <span>Передача файлов через звук</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="Heart" size={14} className="text-accent" />
                    <span>Добрые чаты (благотворительность)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeaturePanel;