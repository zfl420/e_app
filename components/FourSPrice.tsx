import React, { useState } from 'react';
import { ChevronLeft, ScanLine, Mic, ChevronRight } from 'lucide-react';
import StatusBar from './StatusBar';

interface VinHistoryItem {
  id: string;
  brandLogo: string;
  vin: string;
  title: string;
  subTitle: string;
}

interface CategoryItem {
  id: string;
  label: string;
}

interface FsPriceItem {
  id: string;
  vinId: string;
  categoryId: string;
  partName: string;
  oe: string;
  price: string;
}

const VIN_HISTORY: VinHistoryItem[] = [
  {
    id: 'v1',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png',
    vin: 'WDDWH7HB6KF883299',
    title: '奔驰 C 260 Tourer 48V 2019 1.5T 手自一体',
    subTitle: '使用智能接车模块，能帮您快速记下车辆信息',
  },
  {
    id: 'v2',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png',
    vin: 'LSVXZ25N0F2113381',
    title: '大众 途观 2015 1.8TSI 手自一体',
    subTitle: '历史车辆，点击继续查询4S价',
  },
];

const CATEGORY_ITEMS: CategoryItem[] = [
  { id: 'air_filter', label: '空气滤芯' },
  { id: 'brake_pad', label: '刹车片' },
  { id: 'headlamp', label: '大灯' },
  { id: 'battery', label: '蓄电池' },
  { id: 'brake_disc', label: '刹车盘' },
];

const FS_PRICE_ITEMS: FsPriceItem[] = [
  {
    id: 'p1',
    vinId: 'v1',
    categoryId: 'air_filter',
    partName: '空气格',
    oe: 'A 264 094 01 00',
    price: '404.11',
  },
  {
    id: 'p2',
    vinId: 'v1',
    categoryId: 'brake_pad',
    partName: '前刹车片',
    oe: 'A 000 420 25 05',
    price: '968.00',
  },
  {
    id: 'p3',
    vinId: 'v2',
    categoryId: 'brake_pad',
    partName: '前刹车片',
    oe: '5Q0 698 151 F',
    price: '736.00',
  },
];

type Step = 'vin_list' | 'vin_detail';

interface FourSPriceProps {
  onBack: () => void;
  onInquiryClick?: () => void;
  onCreateOrderClick?: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const FourSPrice: React.FC<FourSPriceProps> = ({ onBack, onInquiryClick, onCreateOrderClick, appVersion, onVersionChange, onAdminClick }) => {
  const [step, setStep] = useState<Step>('vin_list');
  const [selectedVin, setSelectedVin] = useState<VinHistoryItem | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleVinClick = (item: VinHistoryItem) => {
    setSelectedVin(item);
    setSelectedCategoryId(null);
    setStep('vin_detail');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const currentPrice = selectedVin && selectedCategoryId
    ? FS_PRICE_ITEMS.find(
        (p) => p.vinId === selectedVin.id && p.categoryId === selectedCategoryId
      )
    : null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Status Bar */}
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-3 border-b border-gray-100">
          <button
            onClick={() => {
              if (step === 'vin_detail') {
                setStep('vin_list');
                setSelectedCategoryId(null);
              } else {
                onBack();
              }
            }}
            className="p-1 -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex-1 text-center text-base font-semibold text-gray-900">
            查4S价
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        {step === 'vin_list' && (
          <>
            {/* How-to Section */}
            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-base font-semibold text-gray-900 mb-2">
                1秒查出4S价
              </div>
              <div className="text-xs text-gray-500 space-y-1 mb-4">
                <p>1. 扫描识别车架号</p>
                <p>2. 说出或输入配件名称</p>
                <p>3. 查看4S参考价</p>
              </div>

              {/* History VIN List */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                {VIN_HISTORY.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleVinClick(item)}
                    className="min-w-[240px] bg-gray-50 rounded-xl px-3 py-3 flex items-center gap-3 border border-gray-100 active:bg-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-100">
                      <span className="text-[11px] text-gray-700 font-medium">
                        {item.title.slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[11px] text-gray-500 font-mono">
                        {item.vin}
                      </div>
                      <div className="text-xs font-medium text-gray-900 line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">
                        {item.subTitle}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* Scan Button */}
            <div className="mt-10 mb-8 flex justify-center">
              <button className="w-16 h-16 rounded-full bg-red-500 shadow-lg flex items-center justify-center">
                <ScanLine className="w-8 h-8 text-white" />
              </button>
            </div>
          </>
        )}

        {step === 'vin_detail' && selectedVin && (
          <>
            {/* Vehicle Card */}
            <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-100">
                <span className="text-xs text-gray-800 font-semibold">
                  {selectedVin.title.slice(0, 2)}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-gray-500 font-mono mb-0.5">
                  {selectedVin.vin}
                </div>
                <div className="text-xs font-semibold text-gray-900 mb-1 line-clamp-1">
                  {selectedVin.title}
                </div>
                <div className="text-[11px] text-emerald-500 mb-1">
                  使用智能接车模块，能帮您快速记下车辆信息，立即开启
                </div>
              </div>
            </div>

            {/* Invite strip */}
            <div className="mx-4 mt-3 bg-white rounded-2xl p-3 shadow-sm flex justify-between items-center">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  邀好友体验，领红包！
                </div>
                <div className="text-[11px] text-gray-500">
                  今日剩 <span className="text-secondary font-semibold">9</span> 次，
                  分享好友可多查 <span className="text-secondary font-semibold">10</span> 次
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full bg-secondary text-white text-xs font-semibold">
                立即分享
              </button>
            </div>

            {/* Search & Categories */}
            <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
              <div className="h-10 rounded-xl bg-gray-50 flex items-center px-3 text-xs text-gray-400 mb-3">
                <span className="flex-1">请输入配件名称或语音录入</span>
                <Mic className="w-4 h-4 text-red-400" />
              </div>

              <div className="mb-2 text-xs font-medium text-gray-800">
                常用配件
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_ITEMS.map((category) => {
                  const active = category.id === selectedCategoryId;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`px-3 py-1.5 rounded-full text-xs border ${
                        active
                          ? 'bg-red-50 text-secondary border-secondary'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Result */}
            <div className="mx-4 mt-3">
              {currentPrice ? (
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-semibold text-gray-900">
                      {currentPrice.partName}
                    </div>
                    <div className="text-sm font-bold text-red-500">
                      ¥{currentPrice.price}
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 mb-3">
                    OE: {currentPrice.oe}
                  </div>
                  <div className="h-10 rounded-xl bg-gray-50 flex items-center px-3 text-[11px] text-gray-400">
                    更多4S价、品牌对照、适配车型等信息，后续可接入真实接口
                  </div>
                </div>
              ) : (
                <div className="text-center text-xs text-gray-400">
                  请选择上方分类，查看当前车辆对应的4S店价格
                </div>
              )}
            </div>

            {/* Mic Button & Bottom Actions */}
            <div className="mt-8 flex flex-col items-center">
              <button className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-red-100">
                <Mic className="w-6 h-6 text-red-500" />
              </button>

              <div className="mt-6 w-full px-6 flex gap-3">
                <button
                  className="flex-1 h-11 rounded-full border border-gray-300 text-sm text-gray-800 bg-white"
                  onClick={onCreateOrderClick}
                >
                  新建工单
                </button>
                <button
                  className="flex-1 h-11 rounded-full bg-red-500 text-white text-sm font-semibold shadow-md"
                  onClick={onInquiryClick}
                >
                  询价
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FourSPrice;


