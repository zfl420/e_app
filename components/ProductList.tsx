import React, { useMemo, useState } from 'react';
import { ChevronLeft, Search, Filter, ShoppingCart } from 'lucide-react';
import { CATEGORY_PRODUCT_MAP } from '../constants';

interface ProductListProps {
  onBack: () => void;
  categoryId: string;
  categoryLabel: string;
  onCartClick?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onBack, categoryId, categoryLabel, onCartClick }) => {
  const [activeTopTab, setActiveTopTab] = useState<'all' | 'engine' | 'brake' | 'gear' | 'steer' | 'diff'>('engine');
  const [activeSort, setActiveSort] = useState<'comprehensive' | 'distance' | 'sales' | 'price'>('comprehensive');

  const products = useMemo(() => CATEGORY_PRODUCT_MAP[categoryId] || [], [categoryId]);

  // 从商品标题中提取简短文字用于显示
  const getProductDisplayText = (title: string): string => {
    // 尝试提取品牌名（通常在标题开头）
    const brandMatch = title.match(/^[^\/\s]+/);
    if (brandMatch) {
      const brand = brandMatch[0];
      // 如果品牌名太长，取前4个字符
      return brand.length > 4 ? brand.substring(0, 4) : brand;
    }
    // 如果没有品牌，取标题前4个字符
    return title.length > 4 ? title.substring(0, 4) : title;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Search */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center px-4 pt-3 pb-2">
          <button onClick={onBack} className="p-1 -ml-1 mr-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <div className="flex-1 bg-gray-100 h-9 rounded-full flex items-center px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder={`${categoryLabel} / 规格 / 品牌 关键字`}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          <button 
            onClick={onCartClick}
            className="ml-3 relative p-1"
          >
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary rounded-full text-xs text-white flex items-center justify-center border-2 border-white font-bold">
              1
            </span>
          </button>
        </div>

        {/* Top Category Tabs - 仅油品分类展示二级油品类型 */}
        {categoryId === 'oil' && (
          <div className="flex px-3 pt-2 pb-1 overflow-x-auto no-scrollbar border-b border-gray-100">
            {[
              { id: 'engine', label: '机油' },
              { id: 'brake', label: '刹车油' },
              { id: 'gear', label: '波箱油' },
              { id: 'steer', label: '方向机油' },
              { id: 'diff', label: '差速器油' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-3 pb-2 text-sm mr-1 whitespace-nowrap relative ${
                  activeTopTab === tab.id ? 'text-secondary font-semibold' : 'text-gray-600'
                }`}
                onClick={() => setActiveTopTab(tab.id as typeof activeTopTab)}
              >
                {tab.label}
                {activeTopTab === tab.id && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-5 h-0.5 bg-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Sort bar + filter */}
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-700">
            {[
              { id: 'comprehensive', label: '综合排序' },
              { id: 'distance', label: '距离' },
              { id: 'sales', label: '销量' },
              { id: 'price', label: '价格' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`mr-4 relative ${
                  activeSort === tab.id ? 'text-secondary font-semibold' : 'text-gray-600'
                }`}
                onClick={() => setActiveSort(tab.id as typeof activeSort)}
              >
                {tab.label}
                {activeSort === tab.id && (
                  <span className="absolute left-0 -bottom-1 right-0 mx-auto w-3 h-0.5 bg-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>

          <button className="flex items-center text-sm text-gray-700">
            <Filter className="w-4 h-4 mr-1" />
            筛选
          </button>
        </div>

        {/* Sub filters */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
          <button className="px-3 py-1 rounded-full border border-secondary text-secondary bg-red-50 text-xs shrink-0">
            适用车型
          </button>
          <button className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs shrink-0">
            品牌
          </button>
          <button className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs shrink-0">
            粘度
          </button>
          <button className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs shrink-0">
            规格
          </button>
          <button className="ml-auto px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs shrink-0">
            仅看有票
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
        {products.map((item) => (
          <div key={item.id} className="bg-white px-4 py-3 mb-2">
            <div className="flex gap-3">
              <div className="w-24 h-24 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-400">
                  {getProductDisplayText(item.title)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 font-medium leading-snug line-clamp-2">
                  {item.title}
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 rounded-sm bg-gray-50 text-xs text-gray-500 border border-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex items-end justify-between">
                  <div>
                    <div className="text-red-500 text-lg font-semibold">
                      <span className="text-[13px] mr-0.5">¥</span>
                      {item.price}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      不含税价：¥{item.priceNoTax}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {item.promo && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs text-white bg-secondary">
                        秒杀价
                      </span>
                    )}
                    <button className="px-3 py-1 rounded-full border border-secondary text-secondary text-xs">
                      加入进货单
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <div className="truncate">
                {item.shop} <span className="mx-1">·</span>
                {item.location}
              </div>
              <div className="flex items-center gap-1">
                <span>{item.volume}</span>
                <span className="w-px h-3 bg-gray-200" />
                <span>{item.sold}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="h-10" />
      </div>
    </div>
  );
};

export default ProductList;


