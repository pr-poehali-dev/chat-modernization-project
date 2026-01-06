import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { soundSystem } from '@/utils/soundNotifications';
import { toast } from '@/components/ui/use-toast';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  category: 'family' | 'work' | 'games' | 'urgent';
  avatar: string;
  isOnline: boolean;
}

const MOCK_CHATS: Chat[] = [
  { id: 1, name: 'Семейный чат', lastMessage: 'Мама: Не забудь купить молоко!', time: '10:30', unread: 3, category: 'family', avatar: '👨‍👩‍👧‍👦', isOnline: true },
  { id: 2, name: 'Рабочая группа', lastMessage: 'Проект готов к релизу 🚀', time: '09:15', unread: 12, category: 'work', avatar: '💼', isOnline: true },
  { id: 3, name: 'Игровой клан', lastMessage: 'Саша: Кто в рейд сегодня?', time: 'Вчера', unread: 0, category: 'games', avatar: '🎮', isOnline: false },
  { id: 4, name: 'Срочно: Заказчик', lastMessage: 'Нужны правки ASAP!!!', time: '11:45', unread: 5, category: 'urgent', avatar: '⚡', isOnline: true },
  { id: 5, name: 'Катя', lastMessage: 'Привет! Как дела?', time: '08:20', unread: 1, category: 'family', avatar: 'К', isOnline: true },
  { id: 6, name: 'Сообщество Dev', lastMessage: 'Новый митап в субботу', time: '2д назад', unread: 0, category: 'work', avatar: '👨‍💻', isOnline: false },
];

const CATEGORIES = [
  { id: 'urgent', name: '⚡ Срочные', gradient: 'gradient-orange' },
  { id: 'work', name: '💼 Работа', gradient: 'gradient-blue' },
  { id: 'family', name: '❤️ Семья', gradient: 'gradient-purple' },
  { id: 'games', name: '🎮 Игры', gradient: 'gradient-blue' },
];

interface ChatListProps {
  selectedChat: number | null;
  onSelectChat: (id: number) => void;
  onToggleFeatures: () => void;
}

const ChatList = ({ selectedChat, onSelectChat, onToggleFeatures }: ChatListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredChats = selectedCategory
    ? MOCK_CHATS.filter(chat => chat.category === selectedCategory)
    : MOCK_CHATS;

  const handleChatClick = (chat: Chat) => {
    onSelectChat(chat.id);
    if (chat.unread > 0) {
      soundSystem.play(chat.category);
    }
  };

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col animate-fade-in">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Messenger
          </h1>
          <Button 
            size="icon" 
            variant="ghost"
            onClick={onToggleFeatures}
            className="hover-scale"
          >
            <Icon name="Sparkles" className="text-primary" />
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="text-xs"
          >
            Все
          </Button>
          {CATEGORIES.map(cat => (
            <Button
              key={cat.id}
              size="sm"
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="text-xs"
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={`p-3 rounded-xl mb-2 cursor-pointer transition-all duration-200 hover:bg-muted hover-scale ${
                selectedChat === chat.id ? 'bg-muted border-2 border-primary' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarFallback className="text-2xl">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse-glow"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <Badge className="bg-gradient-to-r from-secondary to-primary border-0 animate-pulse-glow">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button className="w-full gradient-purple text-white hover:opacity-90 transition-opacity">
          <Icon name="Plus" className="mr-2" />
          Новый чат
        </Button>
      </div>
    </div>
  );
};

export default ChatList;