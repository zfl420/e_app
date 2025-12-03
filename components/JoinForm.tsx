import React from 'react';
import StatusBar from './StatusBar';
import { ChevronLeft } from 'lucide-react';

interface JoinFormProps {
  onBack: () => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <StatusBar variant="white" />

      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-white border-b border-gray-100">
        <button
          onClick={onBack}
          className="mr-2 p-1 -ml-1 text-gray-700 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold text-gray-900">加盟快准</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">门店基础信息</h2>
          <p className="text-xs text-gray-400 mb-4">
            请留下您的基本信息，快准顾问会在 1 个工作日内与您联系。
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">联系人姓名</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                placeholder="请输入您的姓名"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">联系方式</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                placeholder="请输入手机号码"
                inputMode="tel"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">所在城市</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                placeholder="如：广东 广州"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">门店名称（选填）</label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                placeholder="请输入当前门店名称"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">备注需求（选填）</label>
              <textarea
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary resize-none min-h-[72px]"
                placeholder="简单介绍一下您的门店情况或诉求"
              />
            </div>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 px-1">
          提交信息即代表您同意快准车服客服与您电话或短信联系，具体加盟政策以实际沟通为准。
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-6 pt-3 bg-gray-50">
        <button className="w-full h-11 rounded-full bg-secondary text-white text-sm font-semibold shadow-sm active:scale-95 transition-transform">
          提交加盟意向
        </button>
      </div>
    </div>
  );
};

export default JoinForm;


