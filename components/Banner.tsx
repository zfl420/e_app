import React from 'react';
import { getVersionStyles } from '../versionStyles';

interface BannerProps {
  appVersion?: number;
  onClick?: () => void;
}

const Banner: React.FC<BannerProps> = ({ appVersion = 4, onClick }) => {
  const styles = getVersionStyles(appVersion);
  
  return (
    <div 
      className={`${styles.banner.container} overflow-hidden shadow-lg relative group h-32 cursor-pointer`}
      onClick={onClick}
    >
      <img 
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" 
        alt="轮胎" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Simulated overlay content based on original UI */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-transparent flex items-center justify-between pl-6 pr-6">
        <div className="text-white">
          <h3 className="font-bold text-lg leading-tight text-white drop-shadow-md">应诺轮胎 159 特价</h3>
        </div>
        <button 
          className="bg-white text-emerald-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          查看详情
        </button>
      </div>
    </div>
  );
};

export default Banner;