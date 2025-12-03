import React from 'react';
import StatusBar from './StatusBar';
import { ChevronLeft } from 'lucide-react';

interface FeedbackFormProps {
  onBack: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onBack }) => {
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
        <h1 className="text-base font-semibold text-gray-900">意见反馈</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">您的建议对我们很重要</h2>
          <p className="text-xs text-gray-400 mb-4">
            欢迎反馈在使用过程中的问题、改进建议或新的功能想法。
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">反馈内容</label>
              <textarea
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary resize-none min-h-[120px]"
                placeholder="请尽量详细描述您遇到的问题或建议..."
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                联系方式（选填）
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                placeholder="手机号或微信号，方便我们与您联系"
                inputMode="tel"
              />
            </div>
          </div>
        </div>

        <div className="text-[11px] text-gray-400 px-1">
          我们会定期查看并评估所有反馈，无法一一回复，敬请谅解。
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-6 pt-3 bg-gray-50">
        <button className="w-full h-11 rounded-full bg-secondary text-white text-sm font-semibold shadow-sm active:scale-95 transition-transform">
          提交反馈
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;


