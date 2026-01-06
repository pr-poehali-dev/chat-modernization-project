import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import QuizGame from './QuizGame';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  name?: string;
  avatar?: string;
  reactions?: string[];
  role?: string;
  aiSuggestion?: string;
}

const MOCK_MESSAGES: Message[] = [
  { 
    id: 1, 
    text: 'Привет! Как проект?', 
    sender: 'other', 
    time: '10:30', 
    name: 'Анна',
    avatar: 'А',
    role: '👑 Модератор на 1 час'
  },
  { 
    id: 2, 
    text: 'Отлично! Завтра релиз 🚀', 
    sender: 'me', 
    time: '10:32',
    reactions: ['🔥', '👍', '🚀']
  },
  { 
    id: 3, 
    text: 'Супер! Встречаемся в четверг в 16:00?', 
    sender: 'other', 
    time: '10:35',
    name: 'Анна',
    avatar: 'А',
    aiSuggestion: 'AI предлагает добавить событие в календарь'
  },
  { 
    id: 4, 
    text: 'Договорились!', 
    sender: 'me', 
    time: '10:36'
  },
];

interface ChatWindowProps {
  chatId: number | null;
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [showAI, setShowAI] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center animate-scale-in">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Выберите чат
          </h2>
          <p className="text-muted-foreground">
            Начните общение с любого диалога слева
          </p>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        return { ...msg, reactions: [...reactions, emoji] };
      }
      return msg;
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border bg-card animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary/20">
              <AvatarFallback>👨‍👩‍👧‍👦</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Семейный чат</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>5 онлайн</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover-scale"
                  onClick={() => setShowQuiz(!showQuiz)}
                >
                  <Icon name="Gamepad2" className={showQuiz ? "text-primary" : "text-secondary"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Мини-игра: Викторина</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="hover-scale">
                  <Icon name="Clock" className="text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Временные роли</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="hover-scale">
                  <Icon name="Shield" className="text-accent" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Самоуничтожающиеся сообщения</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="hover-scale">
                  <Icon name="Smile" className="text-secondary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>AR-маски</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {msg.sender === 'other' && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="text-sm">{msg.avatar}</AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-md ${msg.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {msg.sender === 'other' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{msg.name}</span>
                    {msg.role && (
                      <Badge variant="outline" className="text-xs border-primary/50">
                        {msg.role}
                      </Badge>
                    )}
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-2xl transition-all hover:scale-105 ${
                    msg.sender === 'me'
                      ? 'gradient-purple text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {msg.time}
                  </span>
                </div>

                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {msg.reactions.map((emoji, i) => (
                      <span key={i} className="text-lg hover:scale-125 transition-transform cursor-pointer">
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}

                {msg.aiSuggestion && showAI && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-2 text-xs flex items-center gap-2 animate-scale-in">
                    <Icon name="Sparkles" size={14} className="text-accent" />
                    <span className="text-accent">{msg.aiSuggestion}</span>
                    <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => setShowAI(false)}>
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 opacity-0 hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6"
                  onClick={() => handleReaction(msg.id, '❤️')}
                >
                  ❤️
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6"
                  onClick={() => handleReaction(msg.id, '🔥')}
                >
                  🔥
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6"
                  onClick={() => handleReaction(msg.id, '😂')}
                >
                  😂
                </Button>
              </div>
            </div>
          ))}
          </div>
        </ScrollArea>

        {showQuiz && (
          <div className="w-96 p-4 border-l border-border animate-slide-in-right">
            <QuizGame onClose={() => setShowQuiz(false)} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 mb-2">
          <Button size="sm" variant="outline" className="text-xs hover-scale">
            <Icon name="Mic" size={14} className="mr-1" />
            Голосовой аватар
          </Button>
          <Button size="sm" variant="outline" className="text-xs hover-scale">
            <Icon name="Image" size={14} className="mr-1" />
            AR-маска
          </Button>
          <Button size="sm" variant="outline" className="text-xs hover-scale">
            <Icon name="Zap" size={14} className="mr-1" />
            Срочно
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Напишите сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-muted border-0"
          />
          <Button 
            onClick={handleSend}
            className="gradient-purple text-white hover:opacity-90 transition-opacity hover-scale"
          >
            <Icon name="Send" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;