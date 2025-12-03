import React, { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface QuickQuoteProjectsProps {
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  price: number;
  times?: string;
}

const CATEGORIES: Category[] = [
  { id: 'minor', name: '小保养' },
  { id: 'basic', name: '基础养护' },
  { id: 'ac', name: '空调养护' },
  { id: 'engine', name: '引擎养护' },
  { id: 'brake', name: '刹车制动' },
  { id: 'cooling', name: '冷却系统' },
  { id: 'gearbox', name: '变速箱' },
  { id: 'suspension', name: '减震悬挂' },
  { id: 'inspection', name: '检查替换' },
];

const MINOR_MAINTENANCE_ITEMS: ProjectItem[] = [
  {
    id: 'p1',
    name: '小保养',
    description: '10000公里或12个月/次｜机油参考用量5.8升',
    price: 349,
    times: '1',
  },
  {
    id: 'p2',
    name: '小保养机油补差',
    description: '10000公里或12个月/次',
    price: 89,
    times: '2',
  },
  {
    id: 'p3',
    name: '机油滤清器更换',
    description: '国内大厂出品, 高效过滤油泥',
    price: 39,
  },
];

const QuickQuoteProjects: React.FC<QuickQuoteProjectsProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>('minor');
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [expandedMinorId, setExpandedMinorId] = useState<string | null>(null);

  const currentItems: ProjectItem[] = useMemo(() => {
    if (activeCategory === 'minor') {
      return MINOR_MAINTENANCE_ITEMS;
    }
    return [];
  }, [activeCategory]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const totalPrice = useMemo(() => {
    if (!currentItems.length || !checkedIds.length) return 0;
    return currentItems
      .filter((item) => checkedIds.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  }, [currentItems, checkedIds]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white pt-10 pb-3 px-4 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex-1 text-center text-base font-semibold text-gray-900">
          项目/材料添加
        </div>
        <div className="w-10" />
      </div>

      {/* Vehicle summary */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
              奔
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                奔驰 GLA级
              </div>
              <div className="text-[11px] text-gray-500">
                VIN码（17位）
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-end gap-1 w-40 h-8 px-3 rounded-full border border-gray-300 bg-white">
              <input
                type="text"
                placeholder="请输入当前里程"
                className="w-24 bg-transparent text-right text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <span className="ml-1 text-xs text-gray-500">公里</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center px-4">
          {['保养适配', '轮胎适配', '项目', '材料'].map((tab, index) => {
            const active = index === 0;
            return (
              <div key={tab} className="flex-1">
                <button
                  className={`w-full py-2 text-sm ${
                    active ? 'text-red-500 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
                {active && (
                  <div className="h-0.5 bg-red-500 rounded-full -mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex bg-white">
        {/* Left category list */}
        <div className="w-24 border-r border-gray-100 bg-gray-50">
          {CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                className={`w-full px-3 py-3 text-xs text-left ${
                  active
                    ? 'bg-white text-red-500 font-semibold'
                    : 'text-gray-700'
                }`}
                onClick={() =>
                  setActiveCategory((prev) =>
                    prev === cat.id ? null : cat.id,
                  )
                }
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Right project list */}
        <div className="flex-1 px-3 py-3">
          {!activeCategory && (
            <div className="h-full flex items-center justify-center text-xs text-gray-400">
              请选择左侧保养项目
            </div>
          )}

          {activeCategory === 'minor' && (
            <div className="space-y-3">
              {currentItems.map((item) => {
                const checked = checkedIds.includes(item.id);
                const isMinorMain = item.id === 'p1';
                const expanded = isMinorMain && expandedMinorId === item.id;
                return (
                  <div
                    key={item.id}
                    className="w-full bg-white rounded-xl border border-gray-100 px-3 py-2"
                  >
                    <button
                      onClick={() => {
                        toggleItem(item.id);
                        if (isMinorMain) {
                          setExpandedMinorId((prev) =>
                            prev === item.id ? null : item.id,
                          );
                        }
                      }}
                      className="w-full flex items-center justify-between active:bg-gray-50 rounded-lg px-1 py-1"
                    >
                      <div className="flex-1 pr-3 text-left">
                        <div className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-sm text-red-500 font-semibold">
                          ¥ {item.price.toFixed(2)}
                        </div>
                        {item.times && (
                          <div className="text-[10px] text-gray-400">
                            x{item.times}
                          </div>
                        )}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            checked
                              ? 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {checked && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>

                    {expanded && (
                      <div className="mt-3 border-t border-gray-100 pt-3 space-y-3">
                        {/* 机油滤清器商品行 */}
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-200 rounded" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">
                              机油滤清器 T牌/TURBOPRO (TL33012)
                            </div>
                            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-[11px] text-emerald-600">
                              国内大厂 出品, 高效过滤油泥
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div>
                                <div className="text-sm text-red-500 font-semibold">
                                  ¥ 39.00
                                </div>
                                <div className="text-[11px] text-gray-400 mt-0.5">
                                  门店: 0
                                </div>
                              </div>
                              <div className="text-[11px] text-gray-500 pr-1">
                                x1
                              </div>
                            </div>
                          </div>
                          <button className="text-xs text-blue-500">
                            更换
                          </button>
                        </div>

                        {/* 更换机油机滤 项目行 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-orange-50 text-[11px] text-orange-500 border border-orange-200">
                              项
                            </span>
                            <span className="text-sm text-gray-900">
                              更换机油机滤
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-red-500 font-semibold">
                              ¥ 60.00
                            </span>
                            <span className="text-[11px] text-gray-500">
                              x1
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-800">
          合计: <span className="text-red-500 font-semibold">¥ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full border border-gray-300 text-xs text-gray-700">
            去报价
          </button>
          <button className="px-4 py-2 rounded-full bg-red-500 text-xs text-white font-semibold">
            去开单
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteProjects;


