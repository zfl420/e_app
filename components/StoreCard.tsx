import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MANAGEMENT_ACTIONS, RECENT_TASKS } from '../constants';

interface StoreCardProps {
  onArrivalClick?: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ onArrivalClick }) => {
  return (
    <div className="mx-4 -mt-16 relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-4">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-50">
        <h2 className="font-bold text-gray-800 text-lg">门店管理</h2>
        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          今日台次: <span className="font-semibold text-gray-800">1</span> | 产值 <span className="font-semibold text-gray-800">¥456.34</span>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {MANAGEMENT_ACTIONS.map((action) => (
          <div key={action.id} className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <span className="text-xs font-medium text-gray-700">{action.label}</span>
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
              <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
                task.status === 'pending_pay' 
                  ? 'border-secondary text-secondary bg-red-50' 
                  : 'border-orange-400 text-orange-500 bg-orange-50'
              }`}>
                {task.status === 'pending_pay' ? '待收款' : '待施工'}
              </span>
              <span className="text-sm text-gray-500">{task.serviceType}</span>
            </div>
          ))}
        </div>
        
        {/* Merged Navigation Action */}
        <div className="flex items-center pl-3 group">
          <span className="text-[10px] bg-secondary text-white px-1.5 py-0.5 rounded mr-1 shadow-sm">99+</span>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;