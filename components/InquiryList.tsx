import React from 'react';
import { Search, Filter, FileText, ShoppingCart, CarFront } from 'lucide-react';
import { INQUIRY_LIST_DATA } from '../constants';

interface InquiryListProps {
  onCartClick?: () => void;
}

const InquiryList: React.FC<InquiryListProps> = ({ onCartClick }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 sticky top-0 z-10 border-b border-gray-100">
        <div className="relative flex items-center justify-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">询价单</h1>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
             <div className="flex flex-col items-center cursor-pointer">
                <FileText className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                <span className="text-[10px] text-gray-500 mt-0.5 scale-90">车主报价单</span>
             </div>
             <div className="flex flex-col items-center cursor-pointer">
                <Filter className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                <span className="text-[10px] text-gray-500 mt-0.5 scale-90">筛选</span>
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-100 rounded-full h-10 flex items-center px-4">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="请输入配件名称、VIN码、询价单号搜索" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
          />
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {INQUIRY_LIST_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 relative">
            
            {/* Header Row */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                {/* Simplified Brand Logo Placeholder */}
                 <CarFront className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug pr-2">{item.carModel}</h3>
                    <span className={`text-xs font-medium shrink-0 ${item.status === 'quoted' ? 'text-green-500' : 'text-gray-400'}`}>
                        {item.status === 'quoted' ? '已报价' : '已过期'}
                    </span>
                 </div>
                 <div className="text-xs text-gray-400 mt-1 font-mono">{item.vin}</div>
              </div>
            </div>

            <div className="h-px bg-gray-50 w-full mb-3"></div>

            {/* Parts List */}
            <div className="space-y-3">
               {item.parts.map((part, idx) => (
                 <div key={idx} className="flex flex-col gap-1">
                    <div className="text-sm font-medium text-gray-800">{part.name}</div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-xs text-gray-400 font-mono scale-90 origin-left">{part.code}</span>
                        <span className="text-xs text-gray-400">{part.date}</span>
                    </div>
                 </div>
               ))}
            </div>

            {/* Cart Button (Absolute) */}
            {item.showCart && (
                <div className="absolute bottom-4 right-4">
                    <button 
                      onClick={onCartClick}
                      className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-secondary hover:bg-gray-50"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            )}
          </div>
        ))}
        {/* Spacer for bottom nav */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default InquiryList;