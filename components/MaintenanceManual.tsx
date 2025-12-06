import React, { useState } from 'react';
import { ChevronLeft, Search, ScanLine, Car, FileText, MessageCircle } from 'lucide-react';
import StatusBar from './StatusBar';

type TabType = 'case' | 'fault' | 'circuit' | 'remote';

interface MaintenanceManualProps {
  onBack: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const MaintenanceManual: React.FC<MaintenanceManualProps> = ({ onBack, appVersion, onVersionChange, onAdminClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('case');

  const tabs = [
    { id: 'case' as TabType, label: '维修案例' },
    { id: 'fault' as TabType, label: '故障码' },
    { id: 'circuit' as TabType, label: '电路图' },
    { id: 'remote' as TabType, label: '远程服务' },
  ];

  const renderHeader = () => (
    <div className="bg-white sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 pt-3 pb-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex-1 text-center text-base font-semibold text-gray-900">
          维修手册
        </div>
        <div className="w-10" />
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="bg-white border-b border-gray-100">
      <div className="flex items-center justify-around px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 text-sm font-medium relative ${
              activeTab === tab.id ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-red-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSearchSection = () => (
    <div className="bg-white px-4 py-4 border-b border-gray-100">
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="输入关键字查询"
          className="w-full h-12 px-4 pr-12 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2">
          <MessageCircle className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="flex gap-2 mb-3">
        <button className="flex-1 bg-gray-50 rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-gray-700 text-sm">
          <ScanLine className="w-4 h-4" />
          <span>扫VIN码</span>
        </button>
        <button className="flex-1 bg-gray-50 rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-gray-700 text-sm">
          <Car className="w-4 h-4" />
          <span>选择车型</span>
        </button>
        <button className="flex-1 bg-gray-50 rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-gray-700 text-sm">
          <span className="text-xs font-mono">VIN</span>
          <span>输入VIN码</span>
        </button>
      </div>
      <div className="text-xs text-gray-500">查询历史: LNYABAA33GVN00267</div>
    </div>
  );

  const renderServiceCategories = () => (
    <div className="bg-white px-4 py-4 border-b border-gray-100">
      <div className="flex items-center justify-around">
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-xs text-gray-700">维修案例</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-xs text-gray-700">故障码</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-xs text-gray-700">电路图</span>
        </button>
        <button className="flex flex-col items-center gap-2 relative">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-xs text-gray-700">远程服务</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded">NEW</span>
        </button>
        <button className="flex flex-col items-center gap-2 relative">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-xs text-gray-700">传视频</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded">领现金</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'case':
        return (
          <div className="px-4 py-6">
            <div className="text-sm text-gray-500 mb-4">维修案例内容</div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    案例标题 {i}
                  </div>
                  <div className="text-xs text-gray-500">
                    案例描述内容...
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'fault':
        return (
          <div className="px-4 py-6">
            <div className="text-sm text-gray-500 mb-4">故障码查询</div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    故障码 P{i}000
                  </div>
                  <div className="text-xs text-gray-500">
                    故障描述内容...
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'circuit':
        return (
          <div className="px-4 py-6">
            <div className="text-sm text-gray-500 mb-4">电路图查询</div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    电路图 {i}
                  </div>
                  <div className="text-xs text-gray-500">
                    电路图描述内容...
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'remote':
        return (
          <div className="px-4 py-6">
            <div className="text-sm text-gray-500 mb-4">远程服务</div>
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                远程编程服务
              </div>
              <div className="text-xs text-gray-500">
                大众奥迪SFD一代解码低至5元
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    远程服务 {i}
                  </div>
                  <div className="text-xs text-gray-500">
                    服务描述内容...
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {renderHeader()}
      {renderTabs()}
      <div className="flex-1 overflow-y-auto">
        {renderSearchSection()}
        {renderServiceCategories()}
        {renderContent()}
      </div>
    </div>
  );
};

export default MaintenanceManual;

