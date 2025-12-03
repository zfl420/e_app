import React from 'react';
import { ShoppingCart, ScanLine, Search } from 'lucide-react';
import { TOP_ACTIONS } from '../constants';

interface HeaderProps {
  onTopActionClick?: (id: string) => void;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTopActionClick, onCartClick }) => {
  return (
    <div className="bg-primary pt-12 pb-24 px-4 rounded-b-[2.5rem] shadow-md relative z-0">
      {/* Search Bar Row */}
      <div className="flex items-center gap-3 mb-6">
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

      {/* Top Actions Grid */}
      <div className="grid grid-cols-4 gap-2">
        {TOP_ACTIONS.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => onTopActionClick && onTopActionClick(action.id)}
          >
            <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
              <action.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium text-white/90">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;