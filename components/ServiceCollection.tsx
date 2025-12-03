import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Car, ChevronRight } from 'lucide-react';

interface ServiceCollectionItem {
  id: string;
  plate: string;
  customerName: string;
  date: string;
  time: string;
  amount: string;
}

// 模拟数据
const SERVICE_COLLECTION_DATA: ServiceCollectionItem[] = [
  {
    id: '1',
    plate: '津FMF123',
    customerName: '客服小傅测试',
    date: '2025-12-03',
    time: '06:27',
    amount: '0.00',
  },
  {
    id: '2',
    plate: '川A58F1Z',
    customerName: '范兵兵',
    date: '2025-12-02',
    time: '11:12',
    amount: '30.00',
  },
  {
    id: '3',
    plate: '川A12311',
    customerName: '123',
    date: '2025-12-01',
    time: '14:05',
    amount: '0.00',
  },
  {
    id: '4',
    plate: '京A51104',
    customerName: '小丘',
    date: '2025-12-02',
    time: '10:14',
    amount: '100.00',
  },
  {
    id: '5',
    plate: '粤F2N212',
    customerName: '芜',
    date: '2025-12-01',
    time: '14:06',
    amount: '344.00',
  },
  {
    id: '6',
    plate: '川G54545',
    customerName: '李总',
    date: '2025-12-01',
    time: '00:07',
    amount: '299.00',
  },
  {
    id: '7',
    plate: '粤B263UL',
    customerName: '翰哥',
    date: '2025-12-01',
    time: '14:30',
    amount: '1776.00',
  },
];

interface ServiceCollectionProps {
  onBack: () => void;
}

const ServiceCollection: React.FC<ServiceCollectionProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 过滤数据
  const filteredData = SERVICE_COLLECTION_DATA.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.plate.toLowerCase().includes(query) ||
      item.customerName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 pt-10 pb-3 px-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-1 -ml-1">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 text-center text-base font-semibold text-white">
            服务收款
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="输入姓名/手机号/车牌号搜索"
              className="w-full h-10 pl-9 pr-3 bg-gray-50 rounded-lg text-sm text-gray-700 placeholder-gray-400 border-none outline-none focus:bg-white focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button className="flex items-center gap-1 px-3 h-10 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>筛选</span>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-3 mb-3 shadow-sm flex items-center gap-3 active:bg-gray-50 transition-colors"
          >
            {/* Car Icon */}
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-red-600" />
            </div>

            {/* Middle Section */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {item.plate} - {item.customerName}
              </div>
              <div className="text-xs text-gray-500">
                {item.date} {item.time}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-0.5">应收:</div>
                <div className="text-sm font-semibold text-gray-900">
                  ¥{item.amount}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCollection;

