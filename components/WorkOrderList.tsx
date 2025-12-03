import React, { useState } from 'react';
import { ChevronLeft, Search, ScanLine, ChevronDown, Car } from 'lucide-react';
import { WORK_ORDER_LIST_DATA } from '../constants';
import { WorkOrderItem, WorkOrderProject } from '../types';

interface WorkOrderListProps {
  onBack: () => void;
}

const WorkOrderList: React.FC<WorkOrderListProps> = ({ onBack }) => {
  const [mainTab, setMainTab] = useState<'pending' | 'working' | 'quality' | 'completed'>('pending');
  const [subTab, setSubTab] = useState<'maintenance' | 'wash' | 'inspection' | 'other'>('maintenance');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getStatusText = (status: WorkOrderItem['orderStatus']) => {
    switch (status) {
      case 'billed':
        return '已开单';
      case 'cancelled':
        return '已取消';
      case 'paid':
        return '已收款';
      case 'pending':
        return '待开单';
      default:
        return '';
    }
  };

  const getStatusColor = (status: WorkOrderItem['orderStatus']) => {
    switch (status) {
      case 'billed':
        return 'text-gray-600';
      case 'cancelled':
        return 'text-gray-400';
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-500';
      default:
        return 'text-gray-600';
    }
  };

  const getProjectStatusText = (status: WorkOrderProject['status']) => {
    switch (status) {
      case 'not_started':
        return '未开始';
      case 'in_progress':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return '未开始';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">施工列表</h1>
          <div className="w-8"></div>
        </div>

        {/* Search */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <div className="flex-1 bg-gray-100 h-10 rounded-lg flex items-center px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Q 车牌号/客户姓名/手机号搜索"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="p-2">
            <ScanLine className="w-5 h-5 text-gray-600" />
          </div>
          <button className="text-secondary text-sm font-medium px-2">筛选</button>
        </div>

        {/* Main Tabs */}
        <div className="flex justify-between px-6 border-b border-gray-100">
          {[
            { id: 'pending', label: '待施工' },
            { id: 'working', label: '施工中' },
            { id: 'quality', label: '待质检' },
            { id: 'completed', label: '已完工' }
          ].map(tab => (
            <div
              key={tab.id}
              onClick={() => setMainTab(tab.id as any)}
              className={`pb-3 text-sm font-medium relative cursor-pointer ${
                mainTab === tab.id ? 'text-secondary' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {mainTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Sub Tabs (only for pending) */}
        {mainTab === 'pending' && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar bg-white">
            {[
              { id: 'maintenance', label: '维保', count: 0 },
              { id: 'wash', label: '洗美', count: 0 },
              { id: 'inspection', label: '检测', count: 0 },
              { id: 'other', label: '其他', count: 0 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium shrink-0 ${
                  subTab === tab.id
                    ? 'bg-red-50 text-secondary border border-secondary/20'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                {tab.label}({tab.count})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {WORK_ORDER_LIST_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            {/* Top Row */}
            <div className="flex items-start gap-3 mb-3">
              {/* Brand Logo */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                {item.brandLogo ? (
                  <img src={item.brandLogo} alt="brand" className="w-8 h-8 object-contain" />
                ) : (
                  <Car className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Car Icon Badge */}
              <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center mt-1 shrink-0">
                <Car className="w-3 h-3 text-white" />
              </div>

              {/* Plate and Customer */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-bold text-gray-900 font-mono">{item.plate}</span>
                  <span className="text-sm text-gray-600">{item.customerName}</span>
                </div>
              </div>

              {/* Price and Status */}
              <div className="text-right shrink-0">
                <div className="text-lg font-bold text-secondary">¥{item.price}</div>
                <div className={`text-xs mt-0.5 ${getStatusColor(item.orderStatus)}`}>
                  {getStatusText(item.orderStatus)}
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="ml-16 mb-2">
              <p className="text-xs text-gray-500">{item.vehicleInfo}</p>
            </div>

            {/* Reception Time */}
            <div className="ml-16 mb-3">
              <p className="text-xs text-gray-500">
                接车时间: {item.receptionTime} ({item.receptionStaff})
              </p>
            </div>

            {/* Projects */}
            <div className="ml-16 mb-2">
              <p className="text-sm text-gray-700 mb-2">项目 ({item.projects.length})</p>
              <div className="space-y-1">
                {item.projects.map((project, idx) => (
                  <div key={project.id} className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{project.name}</span>
                    {project.technician && (
                      <>
                        <span className="text-gray-300">-</span>
                        <span>{project.technician}</span>
                      </>
                    )}
                    <span className="text-gray-300">-</span>
                    <span className="text-gray-400">{getProjectStatusText(project.status)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expand Option */}
            {item.expandable && (
              <div
                className="ml-16 mt-2 flex items-center gap-1 text-xs text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => toggleExpand(item.id)}
              >
                <span>展开全部项目和配件</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedCards.has(item.id) ? 'rotate-180' : ''}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkOrderList;

