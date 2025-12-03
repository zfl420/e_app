import React, { useState } from 'react';
import { Settings, ChevronRight } from 'lucide-react';
import { PROFILE_ORDERS, PROFILE_MENU, PROFILE_STATS } from '../constants';
import StatusBar from './StatusBar';
import { getVersionStyles } from '../versionStyles';

interface ProfileProps {
  appVersion?: number;
  onSettingsClick: () => void;
  onMenuClick?: (menuId: string) => void;
  onOrderClick?: (orderType: 'all' | 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'refund') => void;
  onJoinClick: () => void;
  onFeedbackClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ appVersion = 4, onSettingsClick, onMenuClick, onOrderClick, onJoinClick, onFeedbackClick }) => {
  const [statsPeriod, setStatsPeriod] = useState<'today' | 'yesterday' | 'month'>('today');
  const styles = getVersionStyles(appVersion);

  return (
    <div className={`flex flex-col h-full ${styles.profile.container} pb-24`}>
      {/* Status Bar */}
      <StatusBar variant="white" />
      
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
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">头像</div>
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

        {/* Store Management - 版本3和版本4显示 */}
        {appVersion >= 3 && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="mb-5">
                <h2 className="font-bold text-gray-800 text-base">门店管理</h2>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {PROFILE_MENU.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                        onClick={() => onMenuClick && onMenuClick(item.label)}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <span className="text-xs text-gray-600 text-center font-medium group-hover:text-gray-900">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
        )}

        {/* Stats - 版本1不展示，版本2及以上展示 */}
        {appVersion !== 1 && (
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
                  {PROFILE_STATS.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 py-1">
                          <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                          <span className="text-xs text-gray-400">{stat.label}</span>
                      </div>
                  ))}
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