import React, { useState } from 'react';
import { ChevronLeft, Search, Filter } from 'lucide-react';
import StatusBar from './StatusBar';

interface InventoryItem {
  id: string;
  name: string;
  status: 'on_shelf' | 'off_shelf';
  category: string;
  code: string;
  quantity: string;
  unit: string;
  warehouse?: string;
  oeNumber?: string;
  additionalInfo?: string;
}

const MOCK_INVENTORY_DATA: InventoryItem[] = [
  {
    id: '1',
    name: 'L8 门槛条四门八件套 黑钛',
    status: 'on_shelf',
    category: '制动系',
    code: 'PJ231226000000000033',
    quantity: '329.58',
    unit: '个',
  },
  {
    id: '2',
    name: '众悦',
    status: 'on_shelf',
    category: '发动机',
    code: 'PJ240423000000000003',
    quantity: '253.00',
    unit: '个',
    warehouse: '1.测试删除仓位',
  },
  {
    id: '3',
    name: '博世刹车油DOT5',
    status: 'on_shelf',
    category: '--',
    code: 'BOSS2154',
    quantity: '240.00',
    unit: '个',
  },
  {
    id: '4',
    name: '减震减震',
    status: 'on_shelf',
    category: '发动机',
    code: 'PJ240424000000000005',
    quantity: '235.00',
    unit: '台',
    warehouse: '1.车辆销售仓',
    additionalInfo: '112d112',
  },
  {
    id: '5',
    name: '3395pro',
    status: 'on_shelf',
    category: '冷却系',
    code: 'olaf0903-112',
    quantity: '202.03',
    unit: '个',
    warehouse: '1.A-1',
    oeNumber: '2525255252552',
    additionalInfo: '3395',
  },
  {
    id: '6',
    name: '倒车镜总成g22',
    status: 'on_shelf',
    category: '外观件',
    code: 'PJ240425000000000006',
    quantity: '180.00',
    unit: '个',
    warehouse: '1.主仓库',
  },
];

interface InventoryQueryProps {
  onBack: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const InventoryQuery: React.FC<InventoryQueryProps> = ({ onBack, appVersion, onVersionChange, onAdminClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryList] = useState<InventoryItem[]>(MOCK_INVENTORY_DATA);

  const filteredInventory = inventoryList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.oeNumber && item.oeNumber.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">库存管理</h1>
          <button className="flex items-center gap-1 text-gray-700 text-sm">
            <Filter className="w-4 h-4" />
            <span className="text-sm">筛选</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="配件名称/编码/OE/规格/型号/品牌/车型等"
              className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-6">
        <div className="px-4 pt-4">
          <div className="text-sm text-gray-600 mb-3">库存列表 ({filteredInventory.length}项)</div>
          
          <div className="space-y-3">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              {/* Item Name and Status */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {item.name}
                  </div>
                </div>
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded whitespace-nowrap">
                  上架中
                </span>
              </div>

              {/* Category and Code */}
              <div className="space-y-1.5 mb-2">
                <div className="flex items-center text-xs text-gray-600">
                  <span className="text-gray-500 w-12">分类：</span>
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <span className="text-gray-500 w-12">编码：</span>
                  <span className="font-mono">{item.code}</span>
                </div>
                {item.oeNumber && (
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-gray-500 w-12">OE号：</span>
                    <span className="font-mono">{item.oeNumber}</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-semibold text-gray-900">
                    {item.quantity}
                  </span>
                  <span className="text-xs text-gray-500">{item.unit}</span>
                </div>
                {item.additionalInfo && (
                  <span className="text-xs text-gray-400">{item.additionalInfo}</span>
                )}
              </div>

              {/* Warehouse */}
              {item.warehouse && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-gray-500 w-12">仓库：</span>
                    <span>{item.warehouse}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryQuery;

