import React from 'react';
import Header from './components/Header';
import StoreCard from './components/StoreCard';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl">
        <Header />
        <StoreCard />
        <Banner />
        <CategoryGrid />
        <VideoFeed />
        <BottomNav />
      </div>
    </div>
  );
};

export default App;