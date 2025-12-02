import React from 'react';
import { CATEGORIES } from '../constants';

const CategoryGrid: React.FC = () => {
  return (
    <div className="mx-4 mb-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="grid grid-cols-4 gap-x-2 gap-y-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center gap-2 cursor-pointer group">
             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <cat.icon size={20} strokeWidth={1.5} />
             </div>
            <span className="text-xs text-gray-600 group-hover:text-gray-900">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;