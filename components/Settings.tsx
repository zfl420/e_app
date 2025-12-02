import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center relative border-b border-gray-100 sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-2 absolute left-4">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="w-full text-center text-lg font-medium text-gray-900">设置</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Store Name */}
        <div className="bg-white rounded-lg px-4 py-4 flex justify-between items-center shadow-sm">
            <span className="text-sm text-gray-600">广州市黄埔区车公馆汽车美容店</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-50">
            <div className="px-4 py-4 flex items-start justify-between cursor-pointer active:bg-gray-50">
                <span className="text-sm text-gray-700 shrink-0 mt-1">收货地址</span>
                <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                    <span className="text-sm text-gray-500 text-right leading-tight">
                        浙江省 杭州市 余杭区 仓前街道<br/>
                        <span className="text-gray-900 font-medium">欧美金融城T6幢36层</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer active:bg-gray-50">
                <span className="text-sm text-gray-700">手机号</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">187****7250</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
            </div>
            <div className="px-4 py-4 flex items-center justify-between cursor-pointer active:bg-gray-50">
                <span className="text-sm text-gray-700">收货人</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">邹飞龙</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
            </div>
        </div>

        {/* Version */}
        <div className="bg-white rounded-lg px-4 py-4 flex justify-between items-center shadow-sm">
            <span className="text-sm text-gray-700">版本号</span>
            <span className="text-sm text-gray-400">V1.0.1</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;