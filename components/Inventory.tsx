import React from 'react';
import { ChevronLeft, Calendar, Droplets, Filter, Sparkles, Wrench, Package } from 'lucide-react';

interface InventoryProps {
  onBack: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">库存</h1>
          <div className="flex items-center gap-4 text-gray-700 text-sm">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs">客服</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Calendar className="w-5 h-5" />
              <span className="text-[10px]">本月</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Usage Alert */}
      <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-sm">⚙️</span>
          </div>
          <span className="text-sm">系统使用期已经结束,请及时续费</span>
        </div>
        <button className="bg-red-600 px-3 py-1 rounded text-xs">去续费</button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="p-4 space-y-4">
          {/* Inventory Overview */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800 mb-4">库存总览</h2>
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-bold text-gray-900">0</span>
                <span className="text-xs text-gray-500">入库</span>
                <span className="text-xs text-gray-400">¥0.00</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-bold text-gray-900">0</span>
                <span className="text-xs text-gray-500">出库</span>
                <span className="text-xs text-gray-400">¥0.00</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-bold text-gray-900">37</span>
                <span className="text-xs text-gray-500">库存量</span>
                <span className="text-xs text-gray-400">¥12627.74</span>
              </div>
            </div>
          </div>

          {/* Parts Usage Statistics */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800 mb-4">各类配件用量统计(本月)</h2>
            <div className="space-y-4">
              {/* Engine Oil */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">机油</div>
                    <div className="text-xs text-gray-500">使用0升</div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">无剩余</span>
              </div>

              {/* Three Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">三滤</div>
                    <div className="text-xs text-gray-500">使用0个</div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">剩1个</span>
              </div>

              {/* Brake Pads */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-600 rounded"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">刹车片</div>
                    <div className="text-xs text-gray-500">使用0副</div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">无剩余</span>
              </div>

              {/* Spark Plugs */}
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">火花塞</div>
                    <div className="text-xs text-gray-500">使用0个</div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">无剩余</span>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>

              {/* Maintenance Supplies */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">养护用品</div>
                    <div className="text-xs text-gray-500">使用0件</div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">无剩余</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;






