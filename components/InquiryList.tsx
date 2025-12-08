import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, CarFront, Plus, ChevronLeft } from 'lucide-react';
import { INQUIRY_LIST_DATA } from '../constants';
import StatusBar from './StatusBar';

interface InquiryListProps {
  onCartClick?: () => void;
  onAddInquiry?: () => void;
  onBack?: () => void;
  initialStatus?: 'pending' | 'quoted' | 'expired' | 'all';
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const InquiryList: React.FC<InquiryListProps> = ({ onCartClick, onAddInquiry, onBack, initialStatus = 'all', appVersion, onVersionChange, onAdminClick }) => {
  const [activeStatus, setActiveStatus] = useState<'pending' | 'quoted' | 'expired' | 'all'>(initialStatus);

  useEffect(() => {
    setActiveStatus(initialStatus);
  }, [initialStatus]);

  // 根据选中的状态过滤数据
  const filteredData = useMemo(() => {
    if (activeStatus === 'all') {
      return INQUIRY_LIST_DATA;
    }
    return INQUIRY_LIST_DATA.filter(item => item.status === activeStatus);
  }, [activeStatus]);
  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Fixed Status Bar and Header */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto bg-white">
        <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
        
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button className="p-1 -ml-2" onClick={onBack}>
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-900">询价单</h1>
          </div>
          {onAddInquiry && (
            <button
              type="button"
              onClick={onAddInquiry}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-200 active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5 text-gray-900" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
          <div className="flex gap-6">
            {(['all', 'pending', 'quoted', 'expired'] as const).map(status => {
              const labels: Record<typeof status, string> = {
                all: '全部',
                pending: '待报价',
                quoted: '已报价',
                expired: '已失效',
              };
              return (
                <div
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`text-sm font-medium pb-2 cursor-pointer relative transition-colors ${
                    activeStatus === status ? 'text-secondary font-bold' : 'text-gray-500'
                  }`}
                >
                  {labels[status]}
                  {activeStatus === status && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-secondary rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-100 rounded-full h-10 flex items-center px-4 shadow-sm border border-gray-100">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="请输入配件名称、VIN码、询价单号搜索" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
          />
        </div>
        </div>
      </div>

      {/* Scrollable List Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pt-[13.5rem] pb-24">
        {filteredData.map((item) => (
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
                    <span className={`text-xs font-medium shrink-0 ${
                      item.status === 'quoted' ? 'text-red-500' : 
                      item.status === 'pending' ? 'text-orange-500' : 
                      'text-gray-400'
                    }`}>
                        {item.status === 'quoted' ? '已报价' : 
                         item.status === 'pending' ? '待报价' : 
                         '已失效'}
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

          </div>
        ))}
        {/* Spacer for bottom nav */}
        <div className="h-8"></div>
      </div>

      {/* Fixed Cart Button - Above Bottom Nav */}
      {onCartClick && (
        <div className="fixed bottom-20 right-4 z-40 max-w-md mx-auto left-0 flex justify-end pr-4">
          <button 
            onClick={onCartClick}
            className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-lg text-secondary hover:bg-gray-50 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-7 h-7" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InquiryList;