import React, { useMemo, useState } from 'react';
import { ChevronLeft, Search, ChevronDown, ShoppingCart } from 'lucide-react';
import { CATEGORY_PRODUCT_MAP } from '../constants';
import StatusBar from './StatusBar';
import { ProductItem, SearchParams } from '../types';

interface SearchResultsProps {
  onBack: () => void;
  searchParams: SearchParams;
  onCartClick?: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
  onProductClick?: (productId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  onBack, 
  searchParams, 
  onCartClick, 
  appVersion, 
  onVersionChange, 
  onAdminClick,
  onProductClick
}) => {
  const [activeMainFilter, setActiveMainFilter] = useState<'comprehensive' | 'brand' | 'category'>('comprehensive');
  const [cartCount] = useState(1);
  const [cartTotal] = useState(0);

  // 搜索所有分类的商品
  const allProducts = useMemo(() => {
    const products: ProductItem[] = [];
    Object.values(CATEGORY_PRODUCT_MAP).forEach(categoryProducts => {
      products.push(...categoryProducts);
    });
    return products;
  }, []);

  // 根据搜索参数过滤商品
  const filteredProducts = useMemo(() => {
    let results = allProducts;

    // 关键词搜索
    if (searchParams.keyword) {
      const keyword = searchParams.keyword.toLowerCase();
      results = results.filter(product => {
        const title = product.title.toLowerCase();
        const brand = product.brand?.toLowerCase() || '';
        const specs = product.specs?.toLowerCase() || '';
        const volume = product.volume?.toLowerCase() || '';
        
        return title.includes(keyword) || 
               brand.includes(keyword) || 
               specs.includes(keyword) ||
               volume.includes(keyword) ||
               product.tags.some(tag => tag.toLowerCase().includes(keyword));
      });
    }

    // 品牌筛选
    if (searchParams.brand) {
      const brand = searchParams.brand.toLowerCase();
      results = results.filter(product => 
        product.brand?.toLowerCase().includes(brand)
      );
    }

    // 属性参数筛选
    if (searchParams.attributes) {
      Object.entries(searchParams.attributes).forEach(([key, value]) => {
        if (value) {
          results = results.filter(product => {
            const attrValue = product.attributes?.[key]?.toLowerCase();
            return attrValue?.includes(value.toLowerCase());
          });
        }
      });
    }

    return results;
  }, [allProducts, searchParams]);

  // 从商品标题中提取品牌或产地信息用于图片占位符
  const getProductImageText = (title: string): string => {
    const brandMatch = title.match(/^([^\/\s]+)/);
    if (brandMatch) {
      const brand = brandMatch[1];
      return brand.length > 4 ? brand.substring(0, 4) : brand;
    }
    return '商品';
  };

  const handleProductClick = (productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">搜索结果</h1>
          <div className="w-8" />
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="bg-gray-100 h-10 rounded-lg flex items-center px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="搜索分类、品牌、关键字"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              value={searchParams.keyword || ''}
              readOnly
            />
          </div>
        </div>

        {/* Main Filter Bar */}
        <div className="border-b border-gray-100">
          <div className="flex items-center px-4 py-2">
            {[
              { id: 'comprehensive', label: '综合' },
              { id: 'brand', label: '品牌' },
              { id: 'category', label: '分类' },
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
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-24">
        <div className="px-4 pt-4">
          <div className="text-sm text-gray-600 mb-3">
            {searchParams.keyword ? `搜索"${searchParams.keyword}"` : '搜索结果'} ({filteredProducts.length}项)
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-sm mb-2">暂无搜索结果</div>
              <div className="text-gray-300 text-xs">请尝试其他关键词</div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProductClick(item.id)}
                >
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
                            {item.shop || '快准车服(临安服务站)'}
                          </div>
                        </div>

                        {/* Select Specs Button */}
                        <button 
                          className="px-4 py-1.5 bg-secondary text-white text-xs rounded-lg whitespace-nowrap ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(item.id);
                          }}
                        >
                          选规格
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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

export default SearchResults;

