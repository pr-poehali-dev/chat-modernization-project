import { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import FeaturePanel from '@/components/FeaturePanel';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <ChatList 
        selectedChat={selectedChat} 
        onSelectChat={setSelectedChat}
        onToggleFeatures={() => setShowFeatures(!showFeatures)}
      />
      
      <ChatWindow 
        chatId={selectedChat}
      />
      
      {showFeatures && (
        <FeaturePanel onClose={() => setShowFeatures(false)} />
      )}
    </div>
  );
};

export default Index;
