import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, ScanLine, Plus } from 'lucide-react';
import { CUSTOMER_LIST_DATA, VEHICLE_LIST_DATA } from '../constants';

type CustomerVehicleTab = 'customer' | 'vehicle';

interface CustomerVehicleProps {
  initialTab: CustomerVehicleTab;
  onBack: () => void;
}

const CustomerVehicle: React.FC<CustomerVehicleProps> = ({ initialTab, onBack }) => {
  const [activeTab, setActiveTab] = useState<CustomerVehicleTab>(initialTab);

  // 当入场时根据 initialTab 同步一次
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const isCustomerTab = activeTab === 'customer';

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">客户车辆</h1>
          <div className="flex items-center gap-4 text-gray-700 text-sm">
            {/* 右上角预留 ICON 区域 */}
          </div>
        </div>

        {/* 顶部 Tab：车辆 / 客户 */}
        <div className="flex justify-center gap-16 border-b border-gray-100 px-4">
          {[
            { id: 'vehicle' as CustomerVehicleTab, label: '车辆' },
            { id: 'customer' as CustomerVehicleTab, label: '客户' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-medium relative ${
                activeTab === tab.id ? 'text-secondary' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-8 h-0.5 bg-secondary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* 搜索栏 */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white">
          <div className="flex-1 bg-gray-100 h-10 rounded-lg flex items-center px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder={isCustomerTab ? '客户姓名/手机号搜索' : '车牌号/客户姓名/手机号/VIN码搜索'}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <ScanLine className="w-4 h-4 text-gray-400 ml-2" />
          </div>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 列表区域 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-6">
        {isCustomerTab ? (
          <div className="divide-y divide-gray-100">
            {CUSTOMER_LIST_DATA.map((item) => (
              <div key={item.id} className="bg-white px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100" />
                    <div className="font-semibold text-gray-900 text-sm">
                      {item.name}
                      <span className="ml-2 text-xs text-gray-500">{item.phone}</span>
                    </div>
                  </div>
                  {item.tags?.length ? (
                    <div className="flex gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] border border-orange-300 text-orange-500 bg-orange-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="pl-10 text-xs text-gray-500">{item.summary}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {VEHICLE_LIST_DATA.map((item) => (
              <div key={item.id} className="bg-white px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {item.brandLogo ? (
                        <img
                          src={item.brandLogo}
                          alt={item.plate}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Logo</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900 text-sm">
                          {item.plate}
                        </span>
                        <span className="text-sm text-gray-800">{item.ownerName}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {item.model}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{item.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerVehicle;


