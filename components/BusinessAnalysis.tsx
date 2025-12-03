import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface BusinessAnalysisProps {
  onBack: () => void;
}

type PeriodType = 'day' | 'week' | 'month';
type MainTabType = 'business' | 'customer' | 'diagnosis';
type SideMenuType = 'business' | 'count' | 'marketing';

const BusinessAnalysis: React.FC<BusinessAnalysisProps> = ({ onBack }) => {
  const [mainTab, setMainTab] = useState<MainTabType>('business');
  const [period, setPeriod] = useState<PeriodType>('day');
  const [currentDate, setCurrentDate] = useState('2025-12-03');
  const [sideMenu, setSideMenu] = useState<SideMenuType>('business');

  // 模拟数据
  const businessData = [
    { date: '2025-11-27', revenue: 0, cost: 0, profit: 0, margin: 0 },
    { date: '2025-11-28', revenue: 0, cost: 0, profit: 0, margin: 0 },
    { date: '2025-11-29', revenue: 0, cost: 0, profit: 0, margin: 0 },
    { date: '2025-11-30', revenue: 0, cost: 0, profit: 0, margin: 0 },
    { date: '2025-12-01', revenue: 0, cost: 0, profit: 0, margin: 0 },
    { date: '2025-12-02', revenue: 0, cost: 0, profit: 0, margin: 0 },
    { date: '2025-12-03', revenue: 0, cost: 0, profit: 0, margin: 0 },
  ];

  const serviceData = [
    { date: '2025-12-03', visitCount: 0, consumeCount: 0, unconsumeCount: 0, avgPrice: 0 },
    { date: '2025-12-02', visitCount: 1, consumeCount: 0, unconsumeCount: 0, avgPrice: 0 },
    { date: '2025-12-01', visitCount: 0, consumeCount: 0, unconsumeCount: 0, avgPrice: 0 },
    { date: '2025-11-30', visitCount: 0, consumeCount: 0, unconsumeCount: 0, avgPrice: 0 },
    { date: '2025-11-29', visitCount: 0, consumeCount: 0, unconsumeCount: 0, avgPrice: 0 },
    { date: '2025-11-28', visitCount: 0, consumeCount: 0, unconsumeCount: 2, avgPrice: 0 },
    { date: '2025-11-27', visitCount: 0, consumeCount: 0, unconsumeCount: 0, avgPrice: 0 },
  ];

  const marketingData = [
    { date: '2025-12-03', membership: 0, package: 0 },
    { date: '2025-12-02', membership: 0, package: 0 },
    { date: '2025-12-01', membership: 0, package: 0 },
    { date: '2025-11-30', membership: 0, package: 0 },
    { date: '2025-11-29', membership: 0, package: 0 },
    { date: '2025-11-28', membership: 0, package: 0 },
    { date: '2025-11-27', membership: 0, package: 0 },
  ];

  const handleDateChange = (direction: 'prev' | 'next') => {
    // 简单的日期切换逻辑
    const date = new Date(currentDate);
    if (direction === 'prev') {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1);
    }
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const renderMetricCard = (label: string, value: string | number, unit?: string) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500">{label}</span>
        <Info className="w-3 h-3 text-gray-400" />
      </div>
      <div className="text-xl font-semibold text-gray-900">
        {value}{unit || ''}
      </div>
    </div>
  );

  const renderBusinessSection = () => (
    <div className="space-y-4">
      {/* 指标卡片 */}
      <div className="grid grid-cols-3 gap-3">
        {renderMetricCard('营业额', 0)}
        {renderMetricCard('毛利', 0)}
        {renderMetricCard('毛利率', '0', '%')}
      </div>

      {/* 趋势图 */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-900 mb-4">营业额指标趋势</div>
        <div className="h-48 bg-gray-50 rounded-lg flex items-end justify-center mb-4">
          <div className="text-xs text-gray-400">暂无数据</div>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">营业额</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-600">成本</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">毛利</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">毛利率</span>
          </div>
        </div>
      </div>

      {/* 数据表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-gray-600 font-medium">日期</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">营业额</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">毛利</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">成本</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">毛利率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {businessData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{row.date}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.revenue}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.profit}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.cost}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderServiceSection = () => (
    <div className="space-y-4">
      {/* 指标卡片 */}
      <div className="grid grid-cols-3 gap-3">
        {renderMetricCard('进店台次', 0)}
        {renderMetricCard('消费离店台次', 0)}
        {renderMetricCard('客单价', 0)}
      </div>

      {/* 趋势图 */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-900 mb-4">服务台次及客单价趋势</div>
        <div className="h-48 bg-gray-50 rounded-lg flex items-end justify-center mb-4 relative">
          {/* 简单的柱状图示意 */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around px-4 pb-2">
            {serviceData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                {item.visitCount > 0 && (
                  <div className="w-6 bg-blue-500 rounded-t" style={{ height: `${item.visitCount * 20}px` }}></div>
                )}
                {item.unconsumeCount > 0 && (
                  <div className="w-6 bg-green-500 rounded-t" style={{ height: `${item.unconsumeCount * 20}px` }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">进店台次</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-600">消费台次</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">未消费台次</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">客单价</span>
          </div>
        </div>
      </div>

      {/* 数据表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-gray-600 font-medium">日期</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">进店台次</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">消费台次</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">未消费台次</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">客单价</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {serviceData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{row.date}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.visitCount}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.consumeCount}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.unconsumeCount}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.avgPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMarketingSection = () => (
    <div className="space-y-4">
      {/* 指标卡片 */}
      <div className="grid grid-cols-2 gap-3">
        {renderMetricCard('会员卡推广', 0)}
        {renderMetricCard('套餐卡推广', 0)}
      </div>

      {/* 趋势图 */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-900 mb-4">套餐卡、会员卡推广趋势</div>
        <div className="h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
          <div className="text-4xl mb-2">📦</div>
          <div className="text-sm text-gray-400">暂无数据</div>
        </div>
      </div>

      {/* 数据表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-gray-600 font-medium">日期</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">会员卡售卖数</th>
                <th className="px-3 py-2 text-right text-gray-600 font-medium">套餐卡售卖数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {marketingData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-900">{row.date}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.membership}</td>
                  <td className="px-3 py-2 text-right text-gray-900">{row.package}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部栏 */}
      <div className="bg-white pt-10 pb-3 px-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex-1 text-center text-base font-semibold text-gray-900">
          营业分析
        </div>
        <div className="w-10"></div>
      </div>

      {/* 主标签导航 */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-around">
          {(['business', 'customer', 'diagnosis'] as MainTabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold relative ${
                mainTab === tab ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {tab === 'business' && '营业分析'}
              {tab === 'customer' && '客户分析'}
              {tab === 'diagnosis' && '经营诊断'}
              {mainTab === tab && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 日期选择器 */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['day', 'week', 'month'] as PeriodType[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs rounded ${
                  period === p
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {p === 'day' && '日'}
                {p === 'week' && '周'}
                {p === 'month' && '月'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleDateChange('prev')} className="p-1">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm text-gray-900 font-medium">{currentDate}</span>
            <button onClick={() => handleDateChange('next')} className="p-1">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {mainTab === 'business' && (
          <>
            {sideMenu === 'business' && renderBusinessSection()}
            {sideMenu === 'count' && renderServiceSection()}
            {sideMenu === 'marketing' && renderMarketingSection()}
          </>
        )}
        {mainTab === 'customer' && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-400">
            <div className="text-sm">客户分析功能开发中...</div>
          </div>
        )}
        {mainTab === 'diagnosis' && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-400">
            <div className="text-sm">经营诊断功能开发中...</div>
          </div>
        )}
      </div>

      {/* 右侧浮动菜单 */}
      {mainTab === 'business' && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {(['business', 'count', 'marketing'] as SideMenuType[]).map((menu) => (
              <button
                key={menu}
                onClick={() => setSideMenu(menu)}
                className={`block w-12 py-3 text-xs font-medium ${
                  sideMenu === menu
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {menu === 'business' && '营业'}
                {menu === 'count' && '台次'}
                {menu === 'marketing' && '营销'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessAnalysis;

