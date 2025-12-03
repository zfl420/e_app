import React, { useState } from 'react';
import { ArrowLeft, Car, ChevronRight } from 'lucide-react';

interface OrderDetailProps {
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ onBack }) => {
  const [fuelLevel, setFuelLevel] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-blue-600 pt-10 pb-3 px-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-1 -ml-1">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 text-center text-base font-semibold text-white">
            接车单详情
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Vehicle Information Section */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-gray-900 font-mono mb-1">川G773728</div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded">
                  等级:1级
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">有比较</span>
            </div>
            <button className="text-blue-600 text-sm flex items-center gap-1">
              更换
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-3 mt-3">
            <button className="w-full flex items-center justify-between text-sm text-gray-700">
              <span>车型信息查阅</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Service Details Section */}
        <div className="bg-white mx-4 mt-3 rounded-xl shadow-sm overflow-hidden">
          {/* Pick-up Person */}
          <div className="px-4 py-3 border-b border-gray-100">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-red-500 text-sm">*</span>
                <span className="text-sm text-gray-900">接车人员</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">广州车公馆</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>

          {/* Fuel Level */}
          <div className="px-4 py-3 border-b border-gray-100">
            <button className="w-full flex items-center justify-between">
              <span className="text-sm text-gray-900">进厂油量</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">请选择</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>

          {/* Mileage */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">进厂里程</span>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <input
                  type="text"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="请输入进厂里程"
                  className="text-right text-sm text-gray-700 placeholder-gray-400 border-none outline-none bg-transparent max-w-[120px]"
                />
                <span className="text-sm text-gray-500">KM</span>
              </div>
            </div>
          </div>

          {/* Pick-up Time */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-red-500 text-sm">*</span>
                <span className="text-sm text-gray-900">接车时间</span>
              </div>
              <span className="text-sm text-gray-700">2025-11-21 17:32</span>
            </div>
          </div>

          {/* More Pick-up Information */}
          <div className="px-4 py-3">
            <button className="w-full flex items-center justify-between">
              <span className="text-sm text-gray-900">更多接车信息</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Inspection Section */}
        <div className="bg-white mx-4 mt-3 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <button className="w-full flex items-center justify-between">
              <span className="text-sm text-gray-900">外观/内饰检查</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500">有异常</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>

          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-sm text-gray-700">
              <span className="text-gray-900">中控门锁:</span> 异常
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="text-sm text-gray-700">
              <span className="text-gray-900">内饰:</span> 异常
            </div>
          </div>
        </div>

        {/* Photo and Signature Section */}
        <div className="bg-white mx-4 mt-3 rounded-xl shadow-sm overflow-hidden">
          {/* Photo Information */}
          <div className="px-4 py-3 border-b border-gray-100">
            <button className="w-full flex items-center justify-between">
              <span className="text-sm text-gray-900">照片信息</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">最多200张</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>

          {/* Customer Signature */}
          <div className="px-4 py-3">
            <button className="w-full flex items-center justify-between">
              <span className="text-sm text-gray-900">客户签名</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">未签名</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-20 pb-safe">
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg active:scale-[0.99] transition-transform">
          保存
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;

