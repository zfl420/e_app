import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { ProductItem } from '../types';
import StatusBar from './StatusBar';
import { TIRE_PRODUCTS, WIPER_PRODUCTS, ACTIVITY_BRAKE_PAD_PRODUCTS, ACTIVITY_OIL_PRODUCTS } from '../constants';

interface ActivityListProps {
  onBack: () => void;
  onProductClick?: (productId: string) => void;
  onCartClick?: () => void;
  onViewAllProducts?: (categoryId: string, categoryLabel: string) => void;
  addToCart?: (product: ProductItem) => void;
  cartCount?: number;
  cartTotal?: number;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

// 活动分类配置
const ACTIVITY_CATEGORIES = [
  { id: 'tire', label: '轮胎' },
  { id: 'wiper', label: '雨刮' },
  { id: 'brake_pad', label: '刹车片' },
  { id: 'oil', label: '汽机油' },
];

// 生成模拟商品数据（从constants导入）
const generateActivityProducts = (): Record<string, ProductItem[]> => {
  return {
    tire: TIRE_PRODUCTS,
    wiper: WIPER_PRODUCTS,
    brake_pad: ACTIVITY_BRAKE_PAD_PRODUCTS,
    oil: ACTIVITY_OIL_PRODUCTS,
  };
};

const ActivityList: React.FC<ActivityListProps> = ({
  onBack,
  onProductClick,
  onCartClick,
  onViewAllProducts,
  addToCart,
  cartCount: externalCartCount = 0,
  cartTotal: externalCartTotal = 0,
  appVersion,
  onVersionChange,
  onAdminClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('tire');
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isScrollingRef = useRef(false);

  const activityProducts = generateActivityProducts();

  // 获取所有商品列表（用于计算购物车）
  const allProducts = useMemo(() => {
    return Object.values(activityProducts).flat();
  }, []);

  // 计算购物车总商品数量（本地数量 + 外部数量）
  const cartCount = useMemo(() => {
    const localCount = Object.values(productQuantities).reduce((sum, quantity) => sum + quantity, 0);
    return localCount + externalCartCount;
  }, [productQuantities, externalCartCount]);

  // 计算购物车总价（本地总价 + 外部总价）
  const cartTotal = useMemo(() => {
    const localTotal = allProducts.reduce((total, product) => {
      const quantity = productQuantities[product.id] || 0;
      const price = parseFloat(product.price) || 0;
      return total + (quantity * price);
    }, 0);
    return localTotal + externalCartTotal;
  }, [allProducts, productQuantities, externalCartTotal]);

  // 增加商品数量
  const increaseQuantity = (product: ProductItem) => {
    const currentQuantity = productQuantities[product.id] || 0;
    setProductQuantities(prev => ({
      ...prev,
      [product.id]: currentQuantity + 1
    }));
    
    // 如果提供了addToCart回调，也调用它
    if (addToCart) {
      addToCart(product);
    }
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

  // 处理TAB点击，平滑滚动到对应分类
  const handleTabClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    isScrollingRef.current = true;
    const element = categoryRefs.current[categoryId];
    if (element && scrollContainerRef.current) {
      // 计算目标位置，考虑TAB栏的高度
      const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const targetScrollTop = scrollContainerRef.current.scrollTop + elementTop - containerTop - 120; // 120px是TAB栏和Header的高度
      
      scrollContainerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
      
      // 滚动完成后重置标志
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // 使用IntersectionObserver监听滚动，自动切换TAB
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-120px 0px -60% 0px', // 当分类标题进入顶部120px区域时触发（考虑TAB栏高度）
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // 如果正在手动滚动，不自动切换
      if (isScrollingRef.current) return;

      // 找到最接近顶部的可见分类
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // 按位置排序，选择最接近顶部的
        visibleEntries.sort((a, b) => {
          const aTop = a.boundingClientRect.top;
          const bTop = b.boundingClientRect.top;
          return aTop - bTop;
        });
        
        const topEntry = visibleEntries[0];
        const categoryId = topEntry.target.getAttribute('data-category-id');
        if (categoryId) {
          setActiveCategory(categoryId);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 观察所有分类区域
    ACTIVITY_CATEGORIES.forEach((category) => {
      const element = categoryRefs.current[category.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 从商品标题中提取品牌或产地信息用于图片占位符
  const getProductImageText = (title: string): string => {
    const brandMatch = title.match(/^([^\/\s]+)/);
    if (brandMatch) {
      const brand = brandMatch[1];
      return brand.length > 4 ? brand.substring(0, 4) : brand;
    }
    return '商品';
  };

  // 为每个分类选择最多5个商品显示划线价和特价标签
  const getProductsWithStrikethrough = (products: ProductItem[]): Set<string> => {
    if (products.length === 0) return new Set<string>();
    
    // 使用商品ID的哈希值来排序，确保选择的一致性
    const productsWithHash = products.map(product => ({
      product,
      hash: product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    }));
    
    // 按哈希值排序，确保选择的一致性
    productsWithHash.sort((a, b) => a.hash - b.hash);
    
    // 最多选择5个商品
    const maxCount = 5;
    const selectedIds = new Set<string>();
    
    for (let i = 0; i < Math.min(maxCount, productsWithHash.length); i++) {
      selectedIds.add(productsWithHash[i].product.id);
    }
    
    return selectedIds;
  };

  // 计算商品的划线价（比当前价格高20-30%）
  const getStrikethroughPrice = (productId: string, currentPrice: string, productsWithStrikethrough: Set<string>): string | null => {
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center px-4 pt-3 pb-3 border-b border-gray-100">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900">活动列表</h1>
          <div className="w-10"></div>
        </div>

        {/* Fixed Tab Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center px-4 overflow-x-auto no-scrollbar">
            {ACTIVITY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabClick(category.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeCategory === category.id
                    ? 'text-secondary border-secondary'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-gray-50">
        {ACTIVITY_CATEGORIES.map((category) => {
          const products = activityProducts[category.id] || [];
          return (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
              data-category-id={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-24"
            >
              {/* Category Title */}
              <div className="bg-white px-4 py-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 text-center">{category.label}</h2>
              </div>

              {/* Product List */}
              <div className="px-4 py-4">
                <div className="space-y-3">
                  {(() => {
                    const productsWithStrikethrough = getProductsWithStrikethrough(products);
                    return products.map((product) => {
                      const hasStrikethrough = productsWithStrikethrough.has(product.id);
                      const strikethroughPrice = getStrikethroughPrice(product.id, product.price, productsWithStrikethrough);
                      return (
                        <div
                          key={product.id}
                          onClick={() => onProductClick?.(product.id)}
                          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="flex gap-3">
                            {/* Product Image Placeholder */}
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center relative">
                              <span className="text-xs font-medium text-gray-400">
                                {getProductImageText(product.title)}
                              </span>
                              {/* 特价标签 - 只在有划线价的商品上显示 */}
                              {hasStrikethrough && (
                                <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                  特价
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              {/* Product Title */}
                              <div className="text-sm text-gray-900 font-medium leading-snug line-clamp-2 mb-1.5">
                                {product.title}
                              </div>

                              {/* Volume */}
                              <div className="mb-1.5">
                                <span className="text-xs text-gray-400">{product.volume}</span>
                              </div>

                              {/* Price & Store Info */}
                              <div className="flex items-end justify-between">
                                <div className="flex-1">
                                  {strikethroughPrice ? (
                                    <div className="flex items-baseline gap-2 mb-1">
                                      <div className="text-gray-400 text-sm line-through leading-none">
                                        ¥{strikethroughPrice}
                                      </div>
                                      <div className="text-red-500 text-lg font-bold leading-none">
                                        ¥{product.price}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-red-500 text-lg font-bold leading-none mb-1">
                                      ¥{product.price}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="text-blue-500">马上送</span>
                                    <span>{product.shop}</span>
                                  </div>
                                </div>

                            {/* Quantity Selector */}
                            {(() => {
                              const quantity = productQuantities[product.id] || 0;
                              if (quantity === 0) {
                                // 显示加号按钮
                                return (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      increaseQuantity(product);
                                    }}
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
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        decreaseQuantity(product.id);
                                      }}
                                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm font-medium text-gray-900 min-w-[24px] text-center">
                                      {quantity}
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        increaseQuantity(product);
                                      }}
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
                    });
                  })()}
                </div>

                {/* View All Products Button */}
                <div className="mt-4 mb-2">
                  <button
                    onClick={() => onViewAllProducts?.(category.id, category.label)}
                    className="w-full py-3 text-center text-sm font-medium text-secondary border border-secondary rounded-lg hover:bg-secondary/5 transition-colors"
                  >
                    查看全部商品
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom Spacer */}
        <div className="h-20"></div>
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

export default ActivityList;
