import React from 'react';
import { ChevronLeft, Camera, MapPin, Calendar, MessageCircle, Users } from 'lucide-react';

interface StoreSettingsProps {
  onBack: () => void;
}

const StoreSettings: React.FC<StoreSettingsProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">门店设置</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Store Image */}
      <div className="relative bg-gray-200 h-48">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500 px-4">
              干净整洁的门店照片,可以增加车主好感度
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {/* Store Name */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">广州市黄埔区车公馆汽车美容店</span>
              <button className="p-1">
                <span className="text-xs text-gray-400">✏️</span>
              </button>
            </div>
          </div>

          {/* Add Tags */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <button className="text-sm text-gray-700 flex items-center gap-2">
              <span>+添加标签</span>
            </button>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-gray-700">*营业时间</span>
                </div>
                <span className="text-sm text-gray-500">周一至周日 9:00-18:00</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
            </div>
          </div>

          {/* Service Scope */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-700 mb-2">服务范围</div>
            <button className="text-sm text-gray-500 flex items-center gap-2">
              <span>+ 服务范围</span>
            </button>
          </div>

          {/* Store Address */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-gray-700">*门店地址</span>
                </div>
                <span className="text-sm text-gray-500">九龙镇镇龙新围新二路</span>
              </div>
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Detailed Address */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-700 mb-2">详细地址</div>
            <input
              type="text"
              placeholder="如:xx路xx号"
              className="w-full text-sm text-gray-500 bg-transparent border-none outline-none"
            />
          </div>

          {/* Contact Phone */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700">*联系电话</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">微信同号</span>
                <span className="text-xs text-gray-400">?</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="11位数的手机号"
              className="w-full text-sm text-gray-500 bg-transparent border-none outline-none"
            />
          </div>

          {/* Store Technicians */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-700 mb-2">门店技师</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-lg py-3">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">推荐给朋友</span>
        </button>
        <button className="flex-1 bg-red-500 text-white rounded-lg py-3 text-sm font-medium">
          预览效果
        </button>
      </div>
    </div>
  );
};

export default StoreSettings;


