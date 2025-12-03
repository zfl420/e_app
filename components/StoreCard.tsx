import React, { useMemo } from 'react';
import { ChevronRight, Grid3x3, Calculator } from 'lucide-react';
import { MANAGEMENT_ACTIONS, RECENT_TASKS } from '../constants';
import { getVersionStyles } from '../versionStyles';

interface StoreCardProps {
  appVersion?: number;
  onArrivalClick?: () => void;
  onManagementClick?: (id: string) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ appVersion = 4, onArrivalClick, onManagementClick }) => {
  const styles = getVersionStyles(appVersion);
  
  // 根据版本过滤和修改管理操作列表
  const displayActions = useMemo(() => {
    if (appVersion === 3) {
      // 版本3：按照指定顺序排列
      // 第一排：接车开单、工单列表、车辆管理、快捷收款
      // 第二排：快速报价、客户管理、查报表、全部应用
      const actionMap = new Map(MANAGEMENT_ACTIONS.map(action => [action.id, action]));
      
      const orderedActions = [
        actionMap.get('bill'),           // 接车开单
        actionMap.get('workorders'),     // 工单列表
        actionMap.get('vehicle_manage'), // 车辆管理
        actionMap.get('fast_pay'),       // 快捷收款
        { id: 'quick_quote', label: '快速报价', icon: Calculator, color: 'text-gray-900' }, // 快速报价
        actionMap.get('customer_manage'), // 客户管理
        actionMap.get('reports'),        // 查报表
        { id: 'all_apps', label: '全部应用', icon: Grid3x3, color: 'text-gray-900' }, // 全部应用
      ];
      
      // 过滤掉可能的 undefined 值
      return orderedActions.filter((action): action is NonNullable<typeof action> => action !== undefined);
    }
    // 版本4显示所有操作
    return MANAGEMENT_ACTIONS;
  }, [appVersion]);
  
  return (
    <div className={styles.storeCard.container}>
      {/* Card Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
        <h2 className="font-bold text-gray-800 text-lg">门店管理</h2>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          今日台次: <span className="font-semibold text-gray-800">1</span> | 产值 <span className="font-semibold text-gray-800">¥456.34</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {displayActions.map((action) => (
          <div
            key={action.id}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => onManagementClick && onManagementClick(action.id)}
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </div>
        ))}
      </div>

      {/* Recent Tasks List (Clickable Area) */}
      <div 
        className="flex items-center justify-between cursor-pointer active:bg-gray-50 rounded-lg -mx-2 px-2 py-1 transition-colors"
        onClick={onArrivalClick}
      >
        <div className="flex-1 space-y-3">
          {RECENT_TASKS.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-800 font-mono tracking-tight">{task.plate}</span>
              <span className={`text-xs px-2 py-0.5 rounded-md border ${
                task.status === 'pending_pay' 
                  ? 'border-secondary text-secondary bg-red-50' 
                  : 'border-red-400 text-red-500 bg-red-50'
              }`}>
                {task.status === 'pending_pay' ? '待收款' : '待施工'}
              </span>
              <span className="text-sm text-gray-500">{task.serviceType}</span>
            </div>
          ))}
        </div>
        
        {/* Merged Navigation Action */}
        <div className="flex items-center pl-3 group">
          <span className="text-xs bg-secondary text-white px-1.5 py-0.5 rounded mr-1 shadow-sm">99+</span>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;