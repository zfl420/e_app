import React from 'react';
import { ChevronRight, Car } from 'lucide-react';
import { MANAGEMENT_ACTIONS } from '../constants';

const StoreCard: React.FC = () => {
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

      {/* Merged "More" Option for Vehicles */}
      <div className="border-t border-gray-50 pt-2">
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group">
           <div