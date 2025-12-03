import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Search, ScanLine, CheckCircle2, AlertCircle, MoreHorizontal } from 'lucide-react';
import { ARRIVAL_LIST_DATA } from '../constants';

interface ArrivalListProps {
  onBack: () => void;
  onCreateOrder?: () => void;
}

const ArrivalList: React.FC<ArrivalListProps> = ({ onBack, onCreateOrder }) => {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
            <button onClick={onBack} className="p-1 -ml-2">
                <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <div className="flex items-center gap-1">
                <h1 className="text-lg font-bold text-gray-900">到店列表</h1>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
                09.02~12.02
                <ChevronDown className="w-4 h-4" />
            </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
            <div className="bg-gray-100 h-10 rounded-lg flex items-center px-3">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                    type="text" 
                    placeholder="车牌号/客户姓名/手机号查询" 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                <ScanLine className="w-4 h-4 text-gray-400 ml-2" />
            </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between px-6 border-b border-gray-100">
            {[
                { id: 'received', label: '已接车' },
                { id: 'pending', label: '待完工' },
                { id: 'settle', label: '待结算' },
                { id: 'left', label: '已离店' }
            ].map(tab => (
                <div 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium relative cursor-pointer ${activeTab === tab.id ? 'text-secondary' : 'text-gray-500'}`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full"></div>
                    )}
                </div>
            ))}
        </div>

        {/* Sub Filters */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar bg-white">
            <button className="bg-red-50 text-secondary border border-secondary/20 px-4 py-1.5 rounded-md text-xs font-medium shrink-0">
                全部 1
            </button>
            <button className="bg-gray-50 text-gray-600 px-4 py-1.5 rounded-md text-xs font-medium shrink-0">
                维保 1
            </button>
            <button className="bg-gray-50 text-gray-600 px-4 py-1.5 rounded-md text-xs font-medium shrink-0">
                洗车 0
            </button>
            <button className="bg-gray-50 text-gray-600 px-4 py-1.5 rounded-md text-xs font-medium shrink-0">
                理赔 0
            </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {ARRIVAL_LIST_DATA.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Background Watermark (simulated) */}
                <div className="absolute top-10 right-0 pointer-events-none opacity-[0.03] text-gray-500 select-none text-xs">
                    {/* Repeated text for watermark effect */}
                    <div className="grid grid-cols-2 gap-8 rotate-[-15deg]">
                       <span>天猫养车 (总部分-飞龙)</span><span>天猫养车 (总部分-飞龙)</span>
                       <span>天猫养车 (总部分-飞龙)</span><span>天猫养车 (总部分-飞龙)</span>
                       <span>天猫养车 (总部分-飞龙)</span><span>天猫养车 (总部分-飞龙)</span>
                    </div>
                </div>

                <div className="relative z-10">
                    {/* Header Row */}
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-auto shrink-0 flex items-center justify-center">
                            {/* Logo */}
                             <img src={item.brandLogo} alt="logo" className="w-8 h-8 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 font-mono">{item.plate}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.model}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-gray-400 transform scale-90 origin-right whitespace-nowrap">{item.location}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.time}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Tags Row */}
                    <div className="flex items-center gap-3 mb-2 pl-12">
                        <span className="text-sm text-gray-500 shrink-0">检测:</span>
                        <div className="flex flex-wrap gap-2">
                             {item.tags.length > 0 ? item.tags.map((tag, idx) => (
                                 <div key={idx} className={`flex items-center gap-1 text-xs ${tag.color} bg-gray-50 px-1.5 py-0.5 rounded`}>
                                     {tag.icon === 'check' && <CheckCircle2 className="w-3 h-3" />}
                                     {tag.icon === 'alert' && <AlertCircle className="w-3 h-3" />}
                                     {tag.icon === 'dots' && <MoreHorizontal className="w-3 h-3" />}
                                     {tag.text}
                                 </div>
                             )) : (
                                 <span className="text-xs text-gray-400">--</span>
                             )}
                        </div>
                    </div>

                    {/* Work Order Info */}
                    <div className="pl-12 mb-1">
                        <span className="text-sm text-gray-800">工单: <span className="font-medium">{item.workOrderSummary}</span></span>
                    </div>

                    {/* Staff Info */}
                    <div className="pl-12">
                        <span className="text-sm text-gray-500">SA: {item.sa} &nbsp; 技师: {item.tech}</span>
                    </div>
                </div>
            </div>
        ))}
        {/* Spacer for bottom button */}
        <div className="h-12"></div>
      </div>

      {/* Bottom Button */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-20 pb-safe">
        <button 
          onClick={onCreateOrder}
          className="w-full bg-secondary text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-red-100 active:scale-[0.99] transition-transform"
        >
            接车开单
        </button>
      </div>
    </div>
  );
};

export default ArrivalList;