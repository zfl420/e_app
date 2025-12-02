import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ShoppingCart, Search } from 'lucide-react';
import { SIDEBAR_CATEGORIES, CATEGORY_SECTIONS } from '../constants';

interface PartsListProps {
  onBack: () => void;
}

const PartsList: React.FC<PartsListProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState(SIDEBAR_CATEGORIES[0]);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isClickScrolling = useRef(false);

  // Handle clicking a sidebar item: Scroll to the corresponding section
  const handleSidebarClick = (category: string) => {
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element && rightPanelRef.current) {
      isClickScrolling.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Reset the flag after scroll animation (approximate)
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 500);
    }
  };

  // Handle scrolling the right panel: Update the sidebar selection
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current || !rightPanelRef.current) return;

      const panelTop = rightPanelRef.current.scrollTop;
      const panelHeight = rightPanelRef.current.clientHeight;
      const panelCenter = panelTop + panelHeight / 3; // Trigger earlier than center

      // Find which section is currently in view
      let currentSection = SIDEBAR_CATEGORIES[0];
      
      for (const category of SIDEBAR_CATEGORIES) {
        const element = sectionRefs.current[category];
        if (element) {
            // Offset top relative to the scrolling parent
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;

            if (panelCenter >= offsetTop && panelCenter < offsetBottom) {
                currentSection = category;
                break;
            }
        }
      }

      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection);
      }
    };

    const panel = rightPanelRef.current;
    if (panel) {
      panel.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (panel) {
        panel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeCategory]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0 z-20">
        <button onClick={onBack} className="p-1 -ml-2">
          <ChevronLeft className="w-7 h-7 text-gray-700" />
        </button>
        
        <div className="flex-1 bg-gray-100 h-9 rounded-full flex items-center px-4">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="可输入商品名称/品牌/OE号" 
            className="flex-1 bg-transparent border-none outline-none text-xs text-gray-700 placeholder-gray-400"
          />
        </div>

        <button className="relative p-1">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white font-bold">
            1
          </span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-24 bg-gray-50 h-full overflow-y-auto no-scrollbar shrink-0">
          {SIDEBAR_CATEGORIES.map((item) => (
            <div 
              key={item}
              onClick={() => handleSidebarClick(item)}
              className={`
                relative py-4 text-center text-[13px] font-medium cursor-pointer transition-colors select-none
                ${activeCategory === item 
                  ? 'bg-white text-secondary font-bold' 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {activeCategory === item && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-secondary rounded-r-full" />
              )}
              {item}
            </div>
          ))}
          {/* Spacer at bottom of sidebar */}
          <div className="h-24"></div>
        </div>

        {/* Content Area */}
        <div 
          ref={rightPanelRef}
          className="flex-1 h-full overflow-y-auto bg-white scroll-smooth"
        >
          {SIDEBAR_CATEGORIES.map((category) => {
            const data = CATEGORY_SECTIONS[category];
            if (!data) return null;

            return (
              <div 
                key={category} 
                ref={(el) => (sectionRefs.current[category] = el)}
                className="px-4 pt-6 pb-2"
              >
                {/* Hot Categories Header */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-8 bg-gray-200" />
                  <h3 className="text-sm font-bold text-gray-800">热门分类</h3>
                  <div className="h-px w-8 bg-gray-200" />
                </div>
                
                {/* Categories Grid - Updated to Box Style */}
                <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-8">
                  {data.subcategories.map((sub, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-full aspect-square bg-gray-50 border border-gray-100 rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
                        <img 
                            src={sub.img} 
                            alt={sub.name} 
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{sub.name}</span>
                    </div>
                  ))}
                </div>

                {/* Hot Brands Header */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-8 bg-gray-200" />
                  <h3 className="text-sm font-bold text-gray-800">热门品牌</h3>
                  <div className="h-px w-8 bg-gray-200" />
                </div>
                
                {/* Brands Grid */}
                <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-8">
                  {data.brands.map((brand, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                      <div className="w-full aspect-[2/1] flex items-center justify-center bg-gray-50 border border-gray-100 px-1 rounded-sm">
                         <span className="font-sans font-black text-gray-400 text-sm italic tracking-tighter opacity-80 uppercase truncate w-full text-center">
                            {brand.code}
                         </span>
                      </div>
                      <span className="text-[10px] text-gray-400 text-center truncate w-full">{brand.name}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-100 w-full mb-4"></div>
              </div>
            );
          })}
           {/* Extra space at bottom to allow scrolling last item to top */}
           <div className="h-[60vh]"></div>
        </div>
      </div>
    </div>
  );
};

export default PartsList;