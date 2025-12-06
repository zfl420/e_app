import React from 'react';
import { ChevronLeft, Users, Store, Package, Briefcase, Settings, BarChart3, MessageSquare } from 'lucide-react';
import StatusBar from './StatusBar';

interface AdminPanelProps {
  onBack: () => void;
  onMenuClick?: (menuId: string) => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, onMenuClick, appVersion, onVersionChange, onAdminClick }) => {
  const menuItems = [
    { id: 'employee', icon: Users, label: '员工管理', desc: '管理员工信息和权限' },
    { id: 'store', icon: Store, label: '门店管理', desc: '门店信息和配置' },
    { id: 'inventory', icon: Package, label: '库存管理', desc: '库存盘点和调整' },
    { id: 'parts', icon: Briefcase, label: '配件管理', desc: '配件信息维护' },
    { id: 'workhour', icon: Settings, label: '工时管理', desc: '工时项目设置' },
    { id: 'analysis', icon: BarChart3, label: '数据分析', desc: '经营数据报表' },
    { id: 'feedback', icon: MessageSquare, label: '反馈建议', desc: '用户反馈管理' },
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-1 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold">管理后台</h1>
        </div>
        <p className="text-white/80 text-sm">系统管理与配置中心</p>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onMenuClick && onMenuClick(item.label)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-3">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
