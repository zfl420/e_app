import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, ChevronDown, ShoppingCart, Plus, Minus } from 'lucide-react';
import { CATEGORY_PRODUCT_MAP } from '../constants';
import StatusBar from './StatusBar';

interface ProductListProps {
  onBack: () => void;
  categoryId: string;
  categoryLabel: string;
  onCartClick?: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onBack, categoryId, categoryLabel, onCartClick, appVersion, onVersionChange, onAdminClick }) => {
  const [activeMainFilter, setActiveMainFilter] = useState<'comprehensive' | 'brand' | 'category'>('comprehensive');
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({}); // 商品数量状态 { [productId]: quantity }
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false); // 头部是否折叠
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const isHeaderCollapsedRef = useRef(false); // 使用 ref 避免闭包问题

  const products = useMemo(() => CATEGORY_PRODUCT_MAP[categoryId] || [], [categoryId]);

  // 随机选择20%的商品显示划线价，基于商品ID确保一致性
  const productsWithStrikethrough = useMemo(() => {
    if (products.length === 0) return new Set<string>();
    
    // 使用商品ID的哈希值来确定哪些商品被选中（模5余数为0表示20%）
    const selectedIds = new Set<string>();
    
    products.forEach(product => {
      // 使用简单的哈希函数基于商品ID
      const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      // 模5，余数为0的商品被选中（约20%）
      if (hash % 5 === 0) {
        selectedIds.add(product.id);
      }
    });
    
    // 确保至少选择了一些商品，如果完全没有选中，则选择第一个
    if (selectedIds.size === 0 && products.length > 0) {
      selectedIds.add(products[0].id);
    }
    
    return selectedIds;
  }, [products]);

  // 对商品进行排序，有划线价的商品排在前面
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    return productsCopy.sort((a, b) => {
      const aHasStrikethrough = productsWithStrikethrough.has(a.id);
      const bHasStrikethrough = productsWithStrikethrough.has(b.id);
      
      if (aHasStrikethrough && !bHasStrikethrough) return -1;
      if (!aHasStrikethrough && bHasStrikethrough) return 1;
      return 0; // 保持原有顺序
    });
  }, [products, productsWithStrikethrough]);

  // 计算购物车总商品数量
  const cartCount = useMemo(() => {
    return Object.values(productQuantities).reduce((sum, quantity) => sum + quantity, 0);
  }, [productQuantities]);

  // 计算购物车总价
  const cartTotal = useMemo(() => {
    return products.reduce((total, product) => {
      const quantity = productQuantities[product.id] || 0;
      const price = parseFloat(product.price) || 0;
      return total + (quantity * price);
    }, 0);
  }, [products, productQuantities]);

  // 计算商品的划线价（比当前价格高20-30%）
  const getStrikethroughPrice = (productId: string, currentPrice: string): string | null => {
    if (!productsWithStrikethrough.has(productId)) {
      return null;
    }
    
    const price = parseFloat(currentPrice);
    if (isNaN(price)) return null;
    
    // 基于商品ID生成一个可预测的倍数（1.2-1.3之间）
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const multiplier = 1.2 + (hash % 11) / 100; // 1.2 到 1.3
    
    const strikethroughPrice = Math.round(price * multiplier * 100) / 100;
    return strikethroughPrice.toFixed(2);
  };

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

  // 增加商品数量
  const increaseQuantity = (productId: string) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  // 减少商品数量
  const decreaseQuantity = (productId: string) => {
    setProductQuantities(prev => {
      const currentQuantity = prev[productId] || 0;
      if (currentQuantity <= 1) {
        // 如果数量为1或0，删除该商品（数量变为0）
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      }
      return {
        ...prev,
        [productId]: currentQuantity - 1
      };
    });
  };

  // 同步 ref 和 state
  useEffect(() => {
    isHeaderCollapsedRef.current = isHeaderCollapsed;
  }, [isHeaderCollapsed]);

  // 滚动监听，控制头部区域的折叠/展开
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop;
      const scrollThreshold = 100;
      const scrollDelta = currentScrollTop - lastScrollTop.current;
      
      // 根据滚动方向立即响应
      // 向下滚动（scrollDelta > 0）且超过阈值时，立即折叠
      if (scrollDelta > 0 && currentScrollTop > scrollThreshold && !isHeaderCollapsedRef.current) {
        setIsHeaderCollapsed(true);
      }
      // 向上滚动（scrollDelta < 0）或回到顶部时，立即展开
      else if ((scrollDelta < 0 || currentScrollTop <= scrollThreshold) && isHeaderCollapsedRef.current) {
        setIsHeaderCollapsed(false);
      }
      
      lastScrollTop.current = currentScrollTop;
    };

    // 使用 requestAnimationFrame 优化性能，限制更新频率
    let rafId: number | null = null;
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 50; // 50ms内最多更新一次状态，减少延迟

    const throttledHandleScroll = () => {
      const now = Date.now();
      
      // 如果距离上次更新时间太近，跳过（但第一次滚动立即执行）
      if (lastUpdateTime > 0 && now - lastUpdateTime < UPDATE_INTERVAL) {
        return;
      }

      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          handleScroll();
          lastUpdateTime = Date.now();
          rafId = null;
        });
      }
    };

    scrollContainer.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', throttledHandleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{categoryLabel}</h1>
          <div className="w-8" />
        </div>

        {/* Search Bar - 始终显示 */}
        <div className="px-4 pb-3">
          <div className="bg-gray-100 h-10 rounded-lg flex items-center px-3">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="搜索分类、品牌、关键字"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filter Bars - 可折叠区域 */}
        <div 
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isHeaderCollapsed ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[150px] opacity-100'
          }`}
        >
          {/* Main Filter Bar */}
          <div className="border-b border-gray-100">
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
        </div>
      </div>

      {/* Product List */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-gray-50 pb-24">
        <div className="px-4 pt-4">
          <div className="text-sm text-gray-600 mb-3">商品列表 ({products.length}项)</div>
          
          <div className="space-y-3">
            {sortedProducts.map((item) => {
              const hasStrikethrough = productsWithStrikethrough.has(item.id);
              return (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex gap-3">
              {/* Product Image Placeholder */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center relative">
                <span className="text-xs font-medium text-gray-400">
                  {getProductImageText(item.title)}
                </span>
                {/* 特价标签 */}
                {hasStrikethrough && (
                  <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    特价
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                {/* Product Title */}
                <div className="text-sm text-gray-900 font-medium leading-snug line-clamp-1 mb-1.5">
                  {item.title}
                </div>

                {/* Volume */}
                <div className="mb-1.5">
                  <span className="text-xs text-gray-400">{item.volume}</span>
                </div>

                {/* Price & Store Info */}
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    {(() => {
                      const strikethroughPrice = getStrikethroughPrice(item.id, item.price);
                      return strikethroughPrice ? (
                        <div className="flex items-baseline gap-2 mb-1">
                          <div className="text-gray-400 text-sm line-through leading-none">
                            ¥{strikethroughPrice}
                          </div>
                          <div className="text-red-500 text-lg font-bold leading-none">
                            ¥{item.price}
                          </div>
                        </div>
                      ) : (
                        <div className="text-red-500 text-lg font-bold leading-none mb-1">
                          ¥{item.price}
                        </div>
                      );
                    })()}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-blue-500">马上送</span>
                      <span>快准车服(临安服务站)</span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  {(() => {
                    const quantity = productQuantities[item.id] || 0;
                    if (quantity === 0) {
                      // 显示加号按钮
                      return (
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center ml-2 flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      );
                    } else {
                      // 显示数量选择器（- 数字 +）
                      return (
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium text-gray-900 min-w-[24px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
              </div>
            );
            })}
          </div>
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
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-secondary rounded-full text-xs text-white flex items-center justify-center font-bold">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-0.5">购物车</div>
            <div className="text-red-500 font-semibold">
              {cartTotal > 0 ? `¥${cartTotal.toFixed(2)}` : '¥--'}
            </div>
          </div>

          <button
            onClick={cartCount > 0 ? onCartClick : undefined}
            disabled={cartCount === 0}
            className={`px-6 py-2 text-white text-sm rounded-lg font-medium transition-colors ${
              cartCount > 0
                ? 'bg-secondary cursor-pointer hover:bg-secondary/90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            去结算
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;


