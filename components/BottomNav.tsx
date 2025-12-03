import React from 'react';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'home', onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 z-50 max-w-md mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-end h-16 pb-2">
        {NAV_ITEMS.map((item) => {
          if (item.isPrimary) {
            return (
              <div key={item.id} className="relative -top-5 group cursor-pointer" onClick={() => onTabChange && onTabChange(item.id)}>
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-red-200 group-active:scale-95 transition-transform border-4 border-white">
                  <item.icon className="text-white w-7 h-7" strokeWidth={2.5} />
                </div>
                <span className="block text-center text-xs text-gray-500 mt-1 font-medium">{item.label}</span>
              </div>
            );
          }

          const isActive = activeTab === item.id;

          return (
            <div 
              key={item.id} 
              className="flex flex-col items-center gap-1 w-12 cursor-pointer group"
              onClick={() => onTabChange && onTabChange(item.id)}
            >
              <item.icon 
                className={`w-6 h-6 transition-colors ${isActive ? 'text-secondary fill-current' : 'text-gray-400 group-hover:text-gray-600'}`} 
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className={`text-xs font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;