import React from 'react';
import { ShoppingCart, ScanLine, Search } from 'lucide-react';
import { TOP_ACTIONS } from '../constants';
import StatusBar from './StatusBar';
import { getVersionStyles } from '../versionStyles';

interface HeaderProps {
  appVersion?: number;
  onTopActionClick?: (id: string) => void;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ appVersion = 4, onTopActionClick, onCartClick }) => {
  const styles = getVersionStyles(appVersion);
  
  return (
    <div className={`${styles.header.container} ${styles.header.paddingBottom} px-4 rounded-b-[2.5rem] shadow-md relative z-0`}>
      {/* Status Bar */}
      <StatusBar />
      {/* Search Bar Row */}
      <div className={`flex items-center gap-3 ${styles.header.searchBarMargin}`}>
        <div className="flex-1 bg-white/95 backdrop-blur-sm h-10 rounded-full flex items-center px-4 shadow-sm border border-white/20">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="配件名称/型号搜索" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <ScanLine className="w-5 h-5 text-gray-400 ml-2" />
        </div>
        <button className="relative p-2" onClick={onCartClick}>
          <ShoppingCart className="w-7 h-7 text-white" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-primary"></span>
        </button>
      </div>

      {/* Top Actions Grid - 版本2及以上显示 */}
      {appVersion >= 2 && (
      <div className={`grid ${appVersion >= 3 ? 'grid-cols-5' : 'grid-cols-4'} gap-2 mt-4 ${appVersion === 2 ? 'mb-5' : ''}`}>
        {(appVersion >= 3
          ? [{ id: 'quick_quote', label: '快速报价', icon: ShoppingCart }, ...TOP_ACTIONS]
          : TOP_ACTIONS
        ).map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => onTopActionClick && onTopActionClick(action.id)}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
              <action.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium text-white/90">{action.label}</span>
          </button>
        ))}
      </div>
      )}
    </div>
  );
};

export default Header;