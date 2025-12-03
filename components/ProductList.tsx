import React, { useMemo, useState } from 'react';
import { ChevronLeft, Search, ChevronDown, ShoppingCart } from 'lucide-react';
import { CATEGORY_PRODUCT_MAP } from '../constants';

interface ProductListProps {
  onBack: () => void;
  categoryId: string;
  categoryLabel: string;
  onCartClick?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onBack, categoryId, categoryLabel, onCartClick }) => {
  const [activeMainFilter, setActiveMainFilter] = useState<'comprehensive' | 'brand' | 'category'>('comprehensive');
  const [cartCount] = useState(1); // 购物车商品数量
  const [cartTotal] = useState(0); // 购物车总价

  const products = useMemo(() => CATEGORY_PRODUCT_MAP[categoryId] || [], [categoryId]);

  // 从商品标题中提取品牌或产地信息用于图片占位符
  const getProductImageText = (title: string): string => {
    // 提取品牌名（通常在标题开头）
    const brandMatch = title.match(/^([^\/\s]+)/);
    if (brandMatch) {
      const brand = brandMatch[1];
      // 如果品牌名太长，取前4个字符
      return brand.length > 4 ? brand.substring(0, 4) : brand;
    }
    return '商品';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Header - 红色背景显示分类名称 */}
      <div className="bg-secondary text-white pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-1 -ml-1">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-semibold">{categoryLabel}</h1>
          <div className="w-8" /> {/* 占位符保持居中 */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="bg-gray-100 h-9 rounded-full flex items-center px-3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索分类、品牌、关键字"
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Main Filter Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center px-4 py-2">
          {[
            { id: 'comprehensive', label: '综合' },
            { id: 'brand', label: '品牌' },
            { id: 'category', label: categoryLabel },
          ].map((filter) => (
            <button
              key={filter.id}
              className="flex items-center mr-4 text-sm text-gray-700"
              onClick={() => setActiveMainFilter(filter.id as typeof activeMainFilter)}
            >
              {filter.label}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Attribute Filter Bar */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {[
            '属性筛选',
            '美标API',
            '粘度SAE',
            '净含量(L)',
            '基础油',
          ].map((attr, index) => (
            <button
              key={index}
              className="px-3 py-1.5 rounded-full bg-white text-gray-600 text-xs shrink-0 border border-gray-200"
            >
              {attr}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
        {products.map((item) => (
          <div key={item.id} className="bg-white px-4 py-3 mb-2 border-b border-gray-100">
            <div className="flex gap-3">
              {/* Product Image Placeholder */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-400">
                  {getProductImageText(item.title)}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                {/* Product Title */}
                <div className="text-sm text-gray-900 font-medium leading-snug line-clamp-2 mb-1.5">
                  {item.title}
                </div>

                {/* Adaptable Models & Attributes */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded">
                    适通用
                  </span>
                  <span className="text-xs text-gray-400">{item.volume}</span>
                </div>

                {/* Delivery Time */}
                <div className="mb-2">
                  <span className="text-xs text-blue-500">马上送</span>
                </div>

                {/* Price & Store Info */}
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <div className="text-red-500 text-lg font-bold leading-none mb-1">
                      ¥{item.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      快准车服(临安服务站)
                    </div>
                  </div>

                  {/* Select Specs Button */}
                  <button className="px-4 py-1.5 bg-secondary text-white text-xs rounded-lg whitespace-nowrap ml-2">
                    选规格
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 max-w-md mx-auto z-50 pb-safe">
        <div className="flex items-center gap-3">
          <button 
            onClick={onCartClick}
            className="relative p-2"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-secondary rounded-full text-xs text-white flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-0.5">购物车</div>
            <div className="text-red-500 font-semibold">
              {cartTotal > 0 ? `¥${cartTotal.toFixed(2)}` : '¥--'}
            </div>
          </div>

          <button className="px-6 py-2 bg-gray-300 text-white text-sm rounded-lg font-medium">
            去结算
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;


