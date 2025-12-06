import React, { useState } from 'react';
import { ChevronLeft, ScanLine, ChevronRight, Calendar } from 'lucide-react';
import StatusBar from './StatusBar';

type Step = 'scan' | 'params' | 'result';

interface HistoryVehicle {
  id: string;
  brandLogo: string;
  title: string;
  vin: string;
  date: string;
}

interface MaintenanceItem {
  id: string;
  title: string;
  tag?: 'urgent' | 'normal';
  interval: string;
  parts: string[];
}

const HISTORY_VEHICLES: HistoryVehicle[] = [
  {
    id: 'v1',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png',
    title: '奔驰 C 260 Tourer 48V 2019款 1.5T 手自一体',
    vin: 'WDDWH7HB6XF883297',
    date: '11月19日',
  },
];

const MILEAGE_OPTIONS = [2000, 3000, 4000, 5000, 6000, 7000, 8000];

const MAINTENANCE_ITEMS: MaintenanceItem[] = [
  {
    id: 'm1',
    title: '大保养服务',
    tag: 'urgent',
    interval: '20000km 或 24个月/次',
    parts: ['机油 6.6升 5W-30; 0W-30'],
  },
  {
    id: 'm2',
    title: '更换火花塞',
    tag: 'urgent',
    interval: '60000km 或 72个月/次',
    parts: ['火花塞'],
  },
  {
    id: 'm3',
    title: '更换刹车片',
    tag: 'urgent',
    interval: '45000km 或 24个月/次',
    parts: ['刹车片'],
  },
  {
    id: 'm4',
    title: '更换蓄电池',
    tag: 'urgent',
    interval: '视车辆电压或3年/次',
    parts: ['蓄电池'],
  },
];

interface MaintenanceProps {
  onBack: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const Maintenance: React.FC<MaintenanceProps> = ({ onBack, appVersion, onVersionChange, onAdminClick }) => {
  const [step, setStep] = useState<Step>('scan');
  const [selectedVehicle, setSelectedVehicle] = useState<HistoryVehicle | null>(HISTORY_VEHICLES[0]);
  const [selectedMileage, setSelectedMileage] = useState<number>(5000);
  const [roadDate] = useState<{ year: number; month: number }>({ year: 2018, month: 6 });

  const handleBack = () => {
    if (step === 'scan') {
      onBack();
      return;
    }
    if (step === 'params') {
      setStep('scan');
      return;
    }
    if (step === 'result') {
      setStep('params');
    }
  };

  const handleVehicleClick = (item: HistoryVehicle) => {
    setSelectedVehicle(item);
    setStep('params');
  };

  const renderHeader = () => (
    <div className="bg-white sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 pt-3 pb-3 border-b border-gray-100">
        <button onClick={handleBack} className="p-1 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex-1 text-center text-base font-semibold text-gray-900">
          查保养
        </div>
        <div className="w-10" />
      </div>
    </div>
  );

  const renderVehicleCard = () => {
    if (!selectedVehicle) return null;
    return (
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm flex gap-3">
        <img
          src={selectedVehicle.brandLogo}
          alt="logo"
          className="w-10 h-10 rounded-full bg-gray-50 object-contain border border-gray-100"
        />
        <div className="flex-1">
          <div className="text-[11px] text-gray-500 font-mono mb-0.5">
            {selectedVehicle.vin}
          </div>
          <div className="text-xs font-semibold text-gray-900 mb-1 line-clamp-1">
            {selectedVehicle.title}
          </div>
          <div className="text-[11px] text-emerald-500 mb-1">
            使用智能接车模块，能帮您快速记下车辆信息，立即开启
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {renderHeader()}

      <div className="flex-1 overflow-y-auto pb-6">
        {step === 'scan' && (
          <>
            <div className="mt-6 px-6">
              <div className="rounded-[20px] bg-black/80 h-60 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-8 border border-white/30 rounded-xl" />
                <div className="w-4/5 h-24 border border-white/50 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/40 to-transparent" />
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-red-500 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
                </div>
                <div className="mt-6 text-xs text-white/80">请瞄准VIN码扫描</div>
              </div>
            </div>

            <div className="mt-6 mx-6">
              <button className="w-full h-12 rounded-full bg-red-500 text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2">
                <ScanLine className="w-5 h-5" />
                <span>开始扫码</span>
              </button>
            </div>

            <div className="mt-8 mx-4">
              <div className="text-xs text-gray-400 mb-2">最近用过</div>
              <div className="bg-black rounded-2xl px-4 pt-3 pb-4">
                {HISTORY_VEHICLES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleVehicleClick(item)}
                    className="w-full flex items-center justify-between py-2 active:opacity-80"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.brandLogo}
                        alt="brand"
                        className="w-8 h-8 rounded-full bg-white object-contain"
                      />
                      <div className="text-left">
                        <div className="text-xs text-white line-clamp-1">{item.title}</div>
                        <div className="text-[11px] text-gray-400 font-mono">
                          {item.vin}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-400">{item.date}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 'params' && (
          <>
            {renderVehicleCard()}

            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-xs text-gray-500 mb-2">当前里程</div>
              <div className="flex flex-col items-center gap-1 py-2">
                {MILEAGE_OPTIONS.map((mileage) => {
                  const active = mileage === selectedMileage;
                  return (
                    <button
                      key={mileage}
                      onClick={() => setSelectedMileage(mileage)}
                      className={`w-full h-9 flex items-center justify-center text-sm tracking-[0.15em] ${
                        active ? 'text-gray-900 font-semibold' : 'text-gray-300'
                      }`}
                    >
                      {mileage.toString().padStart(4, '0')} KM
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-xs text-gray-500 mb-2">上路时间</div>
              <button className="w-full h-10 rounded-full bg-gray-50 flex items-center justify-between px-4 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <span>—</span>
                  <span>
                    {roadDate.year} 年 {roadDate.month.toString().padStart(2, '0')} 月
                  </span>
                </div>
                <Calendar className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="mt-10 mx-6">
              <button
                className="w-full h-12 rounded-full bg-red-500 text-white text-sm font-semibold shadow-md"
                onClick={() => setStep('result')}
              >
                查询保养手册
              </button>
            </div>
          </>
        )}

        {step === 'result' && (
          <>
            {renderVehicleCard()}

            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-gray-900">推荐保养项目</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    当前里程 {selectedMileage} KM
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-4">
                {MAINTENANCE_ITEMS.map((item) => (
                  <div key={item.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                      {item.tag === 'urgent' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500 text-white">
                          紧急
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 mb-1">{item.interval}</div>
                    {item.parts.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          配
                        </span>
                        <span className="text-xs text-blue-600 underline underline-offset-2">
                          {p}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 mx-6 mb-4">
              <button className="w-full h-12 rounded-full bg-red-500 text-white text-sm font-semibold shadow-md">
                询价
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Maintenance;


