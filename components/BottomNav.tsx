import React from 'react';
import { NAV_ITEMS } from '../constants';
import { getVersionStyles } from '../versionStyles';

interface BottomNavProps {
  appVersion?: number;
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ appVersion = 4, activeTab = 'home', onTabChange }) => {
  const styles = getVersionStyles(appVersion);
  
  // 根据版本过滤导航项
  const filteredNavItems = NAV_ITEMS.filter((item) => {
    // 版本1不显示沟通和询价单
    if (appVersion === 1) {
      return item.id !== 'chat' && item.id !== 'inquiry';
    }
    // 版本2及以上显示所有导航项（包括沟通和询价单）
    return true;
  });

  // 版本1使用特殊的布局，让左右两个按钮更靠近中间
  const isVersion1 = appVersion === 1;
  const containerClass = isVersion1 
    ? "flex justify-center items-end h-16 pb-2 gap-20"
    : "flex justify-between items-end h-16 pb-2";

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${styles.bottomNav.container} pb-safe pt-2 px-6 z-50 max-w-md mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]`}>
      <div className={containerClass}>
        {filteredNavItems.map((item) => {
          if (item.isPrimary) {
            return (
              <div key={item.id} className="relative -top-2 group cursor-pointer" onClick={() => onTabChange && onTabChange(item.id)}>
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
                className={`w-6 h-6 transition-colors ${isActive ? styles.bottomNav.itemActive : styles.bottomNav.itemInactive} group-hover:text-gray-600`} 
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className={`text-xs font-medium transition-colors ${isActive ? 'text-gray-900' : styles.bottomNav.itemInactive} group-hover:text-gray-600`}>
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