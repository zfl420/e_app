import React from 'react';
import { CATEGORIES } from '../constants';
import { getVersionStyles } from '../versionStyles';

interface CategoryGridProps {
  appVersion?: number;
  onCategoryClick?: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ appVersion = 4, onCategoryClick }) => {
  const styles = getVersionStyles(appVersion);
  
  return (
    <div className={styles.categoryGrid.container}>
      <div className="grid grid-cols-4 gap-x-2 gap-y-6">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => onCategoryClick && onCategoryClick(cat.id)}
          >
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors">
              <cat.icon size={22} strokeWidth={2} />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;