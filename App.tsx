import React, { useState } from 'react';
import Header from './components/Header';
import StoreCard from './components/StoreCard';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import PartsList from './components/PartsList';
import ChatList from './components/ChatList';
import ChatDetail from './components/ChatDetail';
import InquiryList from './components/InquiryList';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [partsViewVisible, setPartsViewVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    if (id === 'all') {
      setPartsViewVisible(true);
    }
  };

  const handleTabChange = (id: string) => {
    if (id === 'publish') return; // Placeholder for main action
    setActiveTab(id);
    // Reset secondary views when switching tabs
    setPartsViewVisible(false);
    setSelectedChatId(null);
  };

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };

  // Render Full Screen Overlays
  if (partsViewVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <PartsList onBack={() => setPartsViewVisible(false)} />
        </div>
      </div>
    );
  }

  if (selectedChatId) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <ChatDetail 
            chatId={selectedChatId} 
            onBack={() => setSelectedChatId(null)} 
          />
        </div>
      </div>
    );
  }

  // Render Main Tabs
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Header />
            <StoreCard />
            <Banner />
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <VideoFeed />
          </div>
        )}

        {activeTab === 'chat' && (
           <ChatList onChatClick={handleChatClick} />
        )}
        
        {activeTab === 'inquiry' && (
           <InquiryList />
        )}

        {/* Placeholders for other tabs */}
        {(activeTab === 'profile') && (
           <div className="flex-1 flex items-center justify-center text-gray-400">
             Coming Soon
           </div>
        )}

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
};

export default App;