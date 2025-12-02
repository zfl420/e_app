import React from 'react';
import { ChevronLeft, ShoppingCart, Search } from 'lucide-react';
import { SIDEBAR_CATEGORIES, HOT_CATEGORIES_DATA, HOT_BRANDS_DATA } from '../constants';

interface PartsListProps {
  onBack: () => void;
}

const PartsList: React.FC<PartsListProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = React.useState('油品');

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-2">
          <ChevronLeft className="w-7 h-7 text-gray-700" />
        </button>
        
        <div className="flex-1 bg-gray-100 h-9 rounded-full flex items-center px-4">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="可输入商品名称/品牌/OE号" 
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-700 placeholder-gray-400"
          />
        </div>

        <button className="relative p-1">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
            1
          </span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-24 bg-gray-50 h-full overflow-y-auto no-scrollbar">
          {SIDEBAR_CATEGORIES.map((item) => (
            <div 
              key={item}
              onClick={() => setActiveCategory(item)}
              className={`
                relative py-4 text-center text-[13px] font-medium cursor-pointer transition-colors
                ${activeCategory === item 
                  ? 'bg-white text-secondary' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {activeCategory === item && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-secondary rounded-r-full" />
              )}
              {item}
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 h-full overflow-y-auto p-4 bg-white">
          {/* Hot Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-gray-200" />
              <h3 className="text-sm font-bold text-gray-800">热门分类</h3>
              <div className="h-px w-8 bg-gray-200" />
            </div>
            
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {HOT_CATEGORIES_DATA.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 object-contain flex items-center justify-center">
                    <img src={cat.img} alt={cat.name} className="max-w-full max-h-full mix-blend-multiply opacity-90" />
                  </div>
                  <span className="text-xs text-gray-500">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Brands */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-6 mt-8">
              <div className="h-px w-8 bg-gray-200" />
              <h3 className="text-sm font-bold text-gray-800">热门品牌</h3>
              <div className="h-px w-8 bg-gray-200" />
            </div>
            
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {HOT_BRANDS_DATA.map((brand, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-8 flex items-center justify-center bg-white">
                     {/* Using text placeholder styled as logo if image not available, but styled nicely */}
                     <span className="font-sans font-black text-gray-400 text-lg italic tracking-tighter opacity-70">
                        {brand.code}
                     </span>
                  </div>
                  <span className="text-xs text-gray-400 text-center">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom spacer for safe area if needed */}
          <div className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default PartsList;
