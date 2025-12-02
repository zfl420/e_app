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
import Profile from './components/Profile';
import Settings from './components/Settings';
import ArrivalList from './components/ArrivalList';
import AIQuote from './components/AIQuote';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [partsViewVisible, setPartsViewVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [settingsViewVisible, setSettingsViewVisible] = useState(false);
  const [arrivalViewVisible, setArrivalViewVisible] = useState(false);

  const handleCategoryClick = (id: string) => {
    if (id === 'all') {
      setPartsViewVisible(true);
    }
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    // Reset secondary views when switching tabs
    setPartsViewVisible(false);
    setSelectedChatId(null);
    setSettingsViewVisible(false);
    setArrivalViewVisible(false);
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

  if (settingsViewVisible) {
    return (
        <div className="min-h-screen bg-background flex justify-center">
          <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
            <Settings onBack={() => setSettingsViewVisible(false)} />
          </div>
        </div>
      );
  }

  if (arrivalViewVisible) {
    return (
        <div className="min-h-screen bg-background flex justify-center">
          <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
            <ArrivalList onBack={() => setArrivalViewVisible(false)} />
          </div>
        </div>
      );
  }

  // AI Quote View (Main Tab)
  if (activeTab === 'ai_quote') {
      return (
        <div className="min-h-screen bg-background flex justify-center">
            <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
                <AIQuote onBack={() => setActiveTab('home')} />
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
            <StoreCard onArrivalClick={() => setArrivalViewVisible(true)} />
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

        {activeTab === 'profile' && (
           <Profile onSettingsClick={() => setSettingsViewVisible(true)} />
        )}

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
};

export default App;