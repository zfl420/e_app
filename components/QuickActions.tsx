import React from 'react';
import { TOP_ACTIONS } from '../constants';
import { getVersionStyles } from '../versionStyles';

interface QuickActionsProps {
  appVersion?: number;
  onActionClick?: (id: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ appVersion = 4, onActionClick }) => {
  const styles = getVersionStyles(appVersion);
  
  return (
    <div className="bg-primary mx-4 my-4 rounded-2xl p-4 shadow-lg">
      <div className="grid grid-cols-4 gap-2">
        {TOP_ACTIONS.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => onActionClick && onActionClick(action.id)}
          >
            <div className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center group-hover:bg-white/40 transition-colors">
              <action.icon className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-white">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

