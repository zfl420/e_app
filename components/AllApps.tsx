import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface AllAppsProps {
  onBack: () => void;
}

interface AppItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface AppSection {
  id: string;
  title: string;
  items: AppItem[];
}

const AllApps: React.FC<AllAppsProps> = ({ onBack }) => {
  // 这里只做静态展示，主要还原“全部应用”页面布局
  const sections: AppSection[] = [
    {
      id: 'receive_order',
      title: '接车开单',
      items: [
        { id: 'new_work_order', label: '新建工单', icon: <span className="text-xl">📄</span> },
        { id: 'new_reception', label: '新建接车单', icon: <span className="text-xl">🚗</span> },
        { id: 'new_wash', label: '新建洗车单', icon: <span className="text-xl">🧽</span> },
      ],
    },
    {
      id: 'view_records',
      title: '查看记录',
      items: [
        { id: 'work_order_records', label: '工单记录', icon: <span className="text-xl">📋</span> },
        { id: 'reception_records', label: '接车单记录', icon: <span className="text-xl">📑</span> },
        { id: 'wash_records', label: '洗车单记录', icon: <span className="text-xl">💧</span> },
        { id: 'cancel_records', label: '报销单记录', icon: <span className="text-xl">💴</span> },
      ],
    },
    {
      id: 'customer_marketing',
      title: '客户营销',
      items: [
        { id: 'customer_vehicle', label: '客户车辆', icon: <span className="text-xl">👤</span> },
        { id: 'reservation_records', label: '预约记录', icon: <span className="text-xl">📆</span> },
        { id: 'potential_customer', label: '潜客管理', icon: <span className="text-xl">⭐</span> },
        { id: 'business_list', label: '商机列表', icon: <span className="text-xl">📈</span> },
        { id: 'coupon_list', label: '优惠券列表', icon: <span className="text-xl">🎟️</span> },
        { id: 'my_customer', label: '我的客户', icon: <span className="text-xl">🧾</span> },
        { id: 'discount_audit', label: '折扣审批', icon: <span className="text-xl">✅</span> },
        { id: 'recharge_card', label: '充值办卡', icon: <span className="text-xl">💳</span> },
        { id: 'recharge_records', label: '充值办卡记录', icon: <span className="text-xl">📘</span> },
      ],
    },
    {
      id: 'workshop_management',
      title: '车间管理',
      items: [
        { id: 'adjust_bays', label: '车间调度', icon: <span className="text-xl">📶</span> },
        { id: 'vehicle_status', label: '车况检查', icon: <span className="text-xl">🔍</span> },
        { id: 'construction_tasks', label: '施工任务', icon: <span className="text-xl">🛠️</span> },
        { id: 'quality_tasks', label: '质检任务', icon: <span className="text-xl">✅</span> },
        { id: 'smart_diagnosis', label: '智能诊断', icon: <span className="text-xl">🤖</span> },
        { id: 'maintenance_cases', label: '维修案例', icon: <span className="text-xl">📚</span> },
        { id: 'maintenance_schemes', label: '维修方案', icon: <span className="text-xl">📝</span> },
      ],
    },
    {
      id: 'warehouse_management',
      title: '仓储管理',
      items: [
        { id: 'inventory_query', label: '库存查询', icon: <span className="text-xl">📦</span> },
        { id: 'purchase_order', label: '采购订单', icon: <span className="text-xl">🧾</span> },
        { id: 'stock_in', label: '入库', icon: <span className="text-xl">📥</span> },
        { id: 'stock_out', label: '出库', icon: <span className="text-xl">📤</span> },
        { id: 'parts_management', label: '配料管理', icon: <span className="text-xl">⚙️</span> },
      ],
    },
    {
      id: 'reports',
      title: '报表',
      items: [
        { id: 'revenue_report', label: '营收报表', icon: <span className="text-xl">📊</span> },
        { id: 'gross_profit_report', label: '毛利报表', icon: <span className="text-xl">📈</span> },
        { id: 'staff_performance', label: '员工业绩', icon: <span className="text-xl">👨‍🔧</span> },
        { id: 'staff_commission', label: '员工提成', icon: <span className="text-xl">💰</span> },
        { id: 'wage_report', label: '工资报表', icon: <span className="text-xl">📄</span> },
        { id: 'project_report', label: '项目报表', icon: <span className="text-xl">📌</span> },
        { id: 'my_commission', label: '我的提成', icon: <span className="text-xl">💹</span> },
      ],
    },
    {
      id: 'finance_management',
      title: '财务管理',
      items: [
        { id: 'service_collection', label: '服务收款', icon: <span className="text-xl">💵</span> },
        { id: 'charge_records', label: '挂账记录', icon: <span className="text-xl">📙</span> },
        { id: 'finance_report', label: '报表', icon: <span className="text-xl">📑</span> },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-10 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">全部应用</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="px-3 pt-3 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm font-bold text-gray-900 mb-4">{section.title}</div>
              <div className="grid grid-cols-4 gap-x-4 gap-y-5">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    className="flex flex-col items-center gap-2 text-gray-700 text-xs active:opacity-70"
                    type="button"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      {item.icon}
                    </div>
                    <span className="text-[12px] leading-tight text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApps;


