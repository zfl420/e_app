import React, { useState } from 'react';
import { ChevronLeft, Search, Plus, User } from 'lucide-react';

interface PartsManagementProps {
  onBack: () => void;
}

const PartsManagement: React.FC<PartsManagementProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const parts = [
    {
      id: '1',
      name: '全合成机油',
      tags: ['云配件', '机油'],
    },
    {
      id: '2',
      name: '品牌机油格',
      tags: ['云配件', '机油'],
    },
    {
      id: '3',
      name: '机油',
      tags: ['云配件', '机油', '常用'],
    },
    {
      id: '4',
      name: '刹车油',
      tags: ['云配件', '刹车油', '常用'],
    },
    {
      id: '5',
      name: '波箱油',
      tags: ['云配件', '波箱油'],
    },
    {
      id: '6',
      name: '变速箱油',
      tags: ['云配件', '齿轮油'],
    },
    {
      id: '7',
      name: '齿轮油',
      tags: ['云配件', '齿轮油'],
    },
    {
      id: '8',
      name: '方向机油',
      tags: ['云配件', '方向机油'],
    },
  ];

  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">配件列表</h1>
          <div className="flex items-center gap-4 text-gray-700 text-sm">
            <div className="flex flex-col items-center gap-0.5">
              <User className="w-5 h-5" />
              <span className="text-[10px]">客服</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Plus className="w-5 h-5" />
              <span className="text-[10px]">新建配件</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <div className="flex-1 bg-gray-100 h-10 rounded-lg flex items-center px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="输入配件名称搜索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="text-sm text-gray-700 px-3">筛选</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white pb-6">
        <div className="px-4 pt-4">
          <div className="text-sm font-bold text-gray-800 mb-3">油品</div>
          
          <div className="space-y-2">
            {filteredParts.map((part) => (
              <div
                key={part.id}
                className="bg-white border-b border-gray-100 py-3 cursor-pointer active:bg-gray-50"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">{part.name}</div>
                <div className="flex flex-wrap gap-2">
                  {part.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsManagement;






