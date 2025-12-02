import React, { useState } from 'react';
import Header from './components/Header';
import StoreCard from './components/StoreCard';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import PartsList from './components/PartsList';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'parts'>('home');

  const handleCategoryClick = (id: string) => {
    if (id === 'all') {
      setCurrentView('parts');
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
        {currentView === 'home' ? (
          <>
            <Header />
            <StoreCard />
            <Banner />
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <VideoFeed />
            <BottomNav />
          </>
        ) : (
          <PartsList onBack={() => setCurrentView('home')} />
        )}
      </div>
    </div>
  );
};

export default App;