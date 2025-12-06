import React, { useState, useMemo } from 'react';
import { Settings, ChevronRight, ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react';
import { PROFILE_ORDERS, PROFILE_MENU, PROFILE_STATS, INQUIRY_LIST_DATA } from '../constants';
import StatusBar from './StatusBar';
import { getVersionStyles } from '../versionStyles';

type StatsPeriod = 'today' | 'yesterday' | 'month';

// 个人中心「今天 / 昨天 / 本月」统计模块的模拟数据
// 金额单位：元，台次数量：台
const MOCK_PROFILE_STATS: Record<
  StatsPeriod,
  {
    产值: string;
    实收: string;
    台次: string;
    客单价: string;
  }
> = {
  today: {
    产值: '2,861',
    实收: '2,430',
    台次: '8',
    客单价: '304',
  },
  yesterday: {
    产值: '3,120',
    实收: '2,980',
    台次: '9',
    客单价: '331',
  },
  month: {
    产值: '56,431',
    实收: '51,260',
    台次: '178',
    客单价: '289',
  },
};

interface ProfileProps {
  appVersion?: number;
  onSettingsClick: () => void;
  onMenuClick?: (menuId: string) => void;
  onOrderClick?: (orderType: 'all' | 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'refund') => void;
  onInquiryClick?: (status: 'pending' | 'quoted' | 'expired' | 'all') => void;
  onJoinClick: () => void;
  onFeedbackClick: () => void;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ appVersion = 4, onSettingsClick, onMenuClick, onOrderClick, onInquiryClick, onJoinClick, onFeedbackClick, onVersionChange, onAdminClick }) => {
  const [statsPeriod, setStatsPeriod] = useState<StatsPeriod>('today');
  const styles = getVersionStyles(appVersion);

  // 统计询价单各状态的数量
  const inquiryStats = useMemo(() => {
    const pending = INQUIRY_LIST_DATA.filter(item => item.status === 'pending').length;
    const quoted = INQUIRY_LIST_DATA.filter(item => item.status === 'quoted').length;
    const expired = INQUIRY_LIST_DATA.filter(item => item.status === 'expired').length;
    return { pending, quoted, expired };
  }, []);

  // 根据版本控制「门店管理」里的入口
  // - 版本1：只展示前两个入口（员工管理、门店管理）
  // - 版本2：去掉「工时管理」入口
  // - 版本3、4：将「工时管理」改为「项目管理」，并更换图标
  const profileMenuItems = (() => {
    if (appVersion === 2) {
      return PROFILE_MENU.filter((item) => item.label !== '工时管理');
    }
    if (appVersion >= 3) {
      return PROFILE_MENU.map((item) =>
        item.label === '工时管理'
          ? { ...item, label: '项目管理', icon: ClipboardList }
          : item
      );
    }
    return PROFILE_MENU;
  })();

  return (
    <div className={`flex flex-col h-full ${styles.profile.container} pb-24`}>
      {/* Status Bar */}
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      
      {/* Header Profile Section */}
      <div className={`${styles.profile.headerSection} px-6 pt-6 pb-8 relative`}>
        <button 
            onClick={onSettingsClick}
            className="absolute top-6 right-6 text-gray-700 p-2"
        >
            <Settings className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&q=80" 
                  alt="用户头像" 
                  className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900 mb-1">邹飞龙</h1>
                <p className="text-sm text-gray-500">广州市黄埔区车公馆汽车美容店</p>
            </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* My Orders */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-gray-800 text-base">我的订单</h2>
                <div 
                    className="flex items-center text-xs text-gray-400 cursor-pointer"
                    onClick={() => onOrderClick && onOrderClick('all')}
                >
                    全部订单
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
            </div>
            <div className="flex justify-between px-2">
                {PROFILE_ORDERS.map((item, idx) => {
                    const orderTypeMap: Record<string, 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'refund'> = {
                        '待付款': 'pending_pay',
                        '待发货': 'pending_ship',
                        '待收货': 'pending_receive',
                        '待评价': 'pending_review',
                        '退款/售后': 'refund',
                    };
                    const orderType = orderTypeMap[item.label] as 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'refund' | undefined;
                    
                    return (
                        <div 
                            key={idx} 
                            className="flex flex-col items-center gap-2 relative cursor-pointer group"
                            onClick={() => orderType && onOrderClick && onOrderClick(orderType)}
                        >
                            <item.icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                            {item.badge && (
                                <span className="absolute -top-1.5 right-0 min-w-[16px] h-4 bg-secondary text-white text-xs flex items-center justify-center rounded-full px-0.5 border-2 border-white">
                                    {item.badge}
                                </span>
                            )}
                            <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900">{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Inquiry List - 仅版本1显示 */}
        {appVersion === 1 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-gray-800 text-base">询价单</h2>
              <div 
                className="flex items-center text-xs text-gray-400 cursor-pointer"
                onClick={() => onInquiryClick && onInquiryClick('all')}
              >
                全部询价单
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-2">
              {/* 待报价 */}
              <div 
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => onInquiryClick && onInquiryClick('pending')}
              >
                <Clock className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900">待报价</span>
              </div>
              {/* 已报价 */}
              <div 
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => onInquiryClick && onInquiryClick('quoted')}
              >
                <div className="relative">
                  <CheckCircle className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                  {inquiryStats.quoted > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-secondary text-white text-xs flex items-center justify-center rounded-full px-0.5 border-2 border-white">
                      {inquiryStats.quoted}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900">已报价</span>
              </div>
              {/* 已失效 */}
              <div 
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => onInquiryClick && onInquiryClick('expired')}
              >
                <XCircle className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900">已失效</span>
              </div>
            </div>
          </div>
        )}

        {/* Store Management */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="mb-5">
            <h2 className="font-bold text-gray-800 text-base">门店管理</h2>
          </div>

          {/* 版本1：只展示两个入口（员工管理、门店管理），与视觉稿一致 */}
          {appVersion === 1 ? (
            <div className="flex gap-10">
              {PROFILE_MENU.slice(0, 2).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  onClick={() => onMenuClick && onMenuClick(item.label)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="text-sm text-gray-700 text-center font-medium group-hover:text-gray-900">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {profileMenuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  onClick={() => onMenuClick && onMenuClick(item.label)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-xs text-gray-600 text-center font-medium group-hover:text-gray-900">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats - 仅版本3及以上展示，版本1和版本2不展示 */}
        {appVersion >= 3 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2">
                  <div className="flex gap-6">
                      {(['today', 'yesterday', 'month'] as const).map(period => (
                          <div 
                              key={period}
                              onClick={() => setStatsPeriod(period)}
                              className={`text-sm font-medium pb-2 cursor-pointer relative transition-colors ${statsPeriod === period ? 'text-secondary font-bold' : 'text-gray-500'}`}
                          >
                              {period === 'today' ? '今天' : period === 'yesterday' ? '昨天' : '本月'}
                              {statsPeriod === period && (
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-secondary rounded-full"></div>
                              )}
                          </div>
                      ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-400 cursor-pointer">
                      更多
                      <ChevronRight className="w-3 h-3 ml-0.5" />
                  </div>
              </div>

              <div className="grid grid-cols-4 divide-x divide-gray-100">
                {PROFILE_STATS.map((stat, idx) => {
                  // 优先从当前周期的模拟数据里取值，兜底用原始常量里的值
                  const periodStats = MOCK_PROFILE_STATS[statsPeriod];
                  const value =
                    (periodStats && (periodStats as Record<string, string>)[stat.label]) ??
                    stat.value;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 py-1">
                      <span className="text-lg font-bold text-gray-900">{value}</span>
                      <span className="text-xs text-gray-400">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
          </div>
        )}

        {/* 加盟快准 & 意见反馈合并模块 - 一个卡片，内部用分割线区分 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            type="button"
            className="w-full px-4 py-3 flex items-center justify-between active:bg-gray-50 transition-colors border-b border-gray-100"
            onClick={onJoinClick}
          >
            <span className="text-sm font-medium text-gray-900">加盟快准</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            type="button"
            className="w-full px-4 py-3 flex items-center justify-between active:bg-gray-50 transition-colors"
            onClick={onFeedbackClick}
          >
            <span className="text-sm font-medium text-gray-900">意见反馈</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Service Hotline - 所有版本统一展示在最后一个模块下方，置于背景上 */}
      <div className="px-4 pb-6 pt-2 text-center text-xs text-gray-400">
        服务热线：
        <span className="ml-1 font-medium text-gray-500">400-969-6661</span>
      </div>
    </div>
  );
};

export default Profile;