import React from 'react';
import { ChevronLeft, UserPlus, User } from 'lucide-react';
import StatusBar from './StatusBar';

interface EmployeeManagementProps {
  onBack: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ onBack, appVersion, onVersionChange, onAdminClick }) => {
  const employees = [
    {
      id: '1',
      name: '王恒',
      phone: '19064361238',
      role: '管理员',
      employeeId: 'ce000377032',
      inviter: '邹飞龙',
      status: '在职',
    },
    {
      id: '2',
      name: '周莹',
      phone: '18868082211',
      role: '管理员',
      employeeId: 'ce000371769',
      inviter: '邹飞龙',
      status: '在职',
    },
    {
      id: '3',
      name: '邹飞龙',
      phone: '17349790590',
      role: '管理员',
      employeeId: 'ce00966937',
      inviter: '吴先生',
      status: '在职',
    },
    {
      id: '4',
      name: '19372102917',
      phone: '19372102917',
      role: '普通员工',
      employeeId: 'ce000365385',
      inviter: '吴先生',
      status: '在职',
    },
    {
      id: '5',
      name: '吴先生',
      phone: '13268026229',
      role: '普通员工',
      employeeId: 'ce00930244',
      inviter: '--',
      status: '在职',
    },
    {
      id: '6',
      name: '吴先生',
      phone: '13570353510',
      role: '管理员',
      employeeId: 'ce00930245',
      inviter: '--',
      status: '在职',
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">员工管理</h1>
          <div className="flex items-center gap-4 text-gray-700 text-sm">
            <div className="flex flex-col items-center gap-0.5">
              <User className="w-5 h-5" />
              <span className="text-[10px]">客服</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <UserPlus className="w-5 h-5" />
              <span className="text-[10px]">邀请员工</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-6">
        <div className="px-4 pt-4">
          <div className="text-sm text-gray-600 mb-3">在职员工 ({employees.length}人)</div>
          
          <div className="space-y-3">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900">{employee.name}</span>
                      <span className="text-xs text-gray-500">{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                        {employee.role}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {employee.employeeId}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      邀请人: {employee.inviter}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-red-600 font-medium">{employee.status}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white border border-gray-300 text-xs text-gray-700 rounded">
                        编辑
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white text-xs rounded">
                        离职
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;






