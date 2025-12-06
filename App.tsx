import React, { useState, Suspense, lazy, useEffect } from 'react';
// 首页必需的组件 - 同步导入
import Header from './components/Header';
import StoreCard from './components/StoreCard';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import { CATEGORIES } from './constants';
import { getVersionStyles } from './versionStyles';
import { OrderTab } from './components/MyOrders';
import { SearchParams, ScanResult } from './types';

// 懒加载组件 - 按需加载
const PartsList = lazy(() => import('./components/PartsList'));
const ChatList = lazy(() => import('./components/ChatList'));
const ChatDetail = lazy(() => import('./components/ChatDetail'));
const InquiryList = lazy(() => import('./components/InquiryList'));
const Profile = lazy(() => import('./components/Profile'));
const Settings = lazy(() => import('./components/Settings'));
const ArrivalList = lazy(() => import('./components/ArrivalList'));
const AIQuote = lazy(() => import('./components/AIQuote'));
const ProductList = lazy(() => import('./components/ProductList'));
const CustomerVehicle = lazy(() => import('./components/CustomerVehicle'));
const FourSPrice = lazy(() => import('./components/FourSPrice'));
const Maintenance = lazy(() => import('./components/Maintenance'));
const Catalog = lazy(() => import('./components/Catalog'));
const InventoryQuery = lazy(() => import('./components/InventoryQuery'));
const VINScan = lazy(() => import('./components/VINScan'));
const ServiceCollection = lazy(() => import('./components/ServiceCollection'));
const QuickQuoteProjects = lazy(() => import('./components/QuickQuoteProjects'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const MaintenanceManual = lazy(() => import('./components/MaintenanceManual'));
const BusinessAnalysis = lazy(() => import('./components/BusinessAnalysis'));
const Marketing = lazy(() => import('./components/Marketing'));
const OrderDetail = lazy(() => import('./components/OrderDetail'));
const PurchaseOrderDetail = lazy(() => import('./components/PurchaseOrderDetail'));
const WorkOrderList = lazy(() => import('./components/WorkOrderList'));
const ShoppingCart = lazy(() => import('./components/ShoppingCart'));
const FeedDetail = lazy(() => import('./components/FeedDetail'));
const EmployeeManagement = lazy(() => import('./components/EmployeeManagement'));
const StoreSettings = lazy(() => import('./components/StoreSettings'));
const Inventory = lazy(() => import('./components/Inventory'));
const PartsManagement = lazy(() => import('./components/PartsManagement'));
const WorkHourList = lazy(() => import('./components/WorkHourList'));
const MyOrders = lazy(() => import('./components/MyOrders'));
const AllApps = lazy(() => import('./components/AllApps'));
const JoinForm = lazy(() => import('./components/JoinForm'));
const FeedbackForm = lazy(() => import('./components/FeedbackForm'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const SearchResults = lazy(() => import('./components/SearchResults'));
const ProductScan = lazy(() => import('./components/ProductScan'));

// 加载中占位组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">加载中...</div>
  </div>
);

// TOAST 组件
const Toast: React.FC<{ visible: boolean; message: string }> = ({ visible, message }) => {
  if (!visible) return null;
  
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] transition-opacity duration-300">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium max-w-xs mx-auto">
        {message}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [appVersion, setAppVersion] = useState<number>(4); // 默认版本4（完整版）
  const [activeTab, setActiveTab] = useState<string>('home');
  const [partsViewVisible, setPartsViewVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [settingsViewVisible, setSettingsViewVisible] = useState(false);
  const [arrivalViewVisible, setArrivalViewVisible] = useState(false);
  const [productListVisible, setProductListVisible] = useState(false);
  const [productCategory, setProductCategory] = useState<{ id: string; label: string } | null>(null);
  const [customerVehicleVisible, setCustomerVehicleVisible] = useState(false);
  const [customerVehicleTab, setCustomerVehicleTab] = useState<'customer' | 'vehicle'>('customer');
  const [fsPriceVisible, setFsPriceVisible] = useState(false);
  const [maintenanceVisible, setMaintenanceVisible] = useState(false);
  const [catalogVisible, setCatalogVisible] = useState(false);
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [vinScanVisible, setVinScanVisible] = useState(false);
  const [serviceCollectionVisible, setServiceCollectionVisible] = useState(false);
  const [productDetailVisible, setProductDetailVisible] = useState(false);
  const [maintenanceManualVisible, setMaintenanceManualVisible] = useState(false);
  const [businessAnalysisVisible, setBusinessAnalysisVisible] = useState(false);
  const [marketingVisible, setMarketingVisible] = useState(false);
  const [orderDetailVisible, setOrderDetailVisible] = useState(false);
  const [workOrderListVisible, setWorkOrderListVisible] = useState(false);
  const [shoppingCartVisible, setShoppingCartVisible] = useState(false);
  const [feedDetailVisible, setFeedDetailVisible] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(null);
  const [employeeManagementVisible, setEmployeeManagementVisible] = useState(false);
  const [storeSettingsVisible, setStoreSettingsVisible] = useState(false);
  const [partsManagementVisible, setPartsManagementVisible] = useState(false);
  const [workHourListVisible, setWorkHourListVisible] = useState(false);
  const [myOrdersVisible, setMyOrdersVisible] = useState(false);
  const [myOrdersTab, setMyOrdersTab] = useState<OrderTab>('all');
  const [purchaseOrderDetailVisible, setPurchaseOrderDetailVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [allAppsVisible, setAllAppsVisible] = useState(false);
  const [quickQuoteProjectsVisible, setQuickQuoteProjectsVisible] = useState(false);
  const [vinScanMode, setVinScanMode] = useState<'order' | 'quick_quote'>('order');
  const [joinFormVisible, setJoinFormVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const [inquiryListVisible, setInquiryListVisible] = useState(false);
  const [inquiryListInitialStatus, setInquiryListInitialStatus] = useState<'pending' | 'quoted' | 'expired' | 'all'>('all');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const [searchParams, setSearchParams] = useState<{ keyword?: string; brand?: string; attributes?: Record<string, string> }>({});
  const [productScanVisible, setProductScanVisible] = useState(false);
  
  // TOAST 状态
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 购物车状态
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 获取当前版本的样式配置
  const versionStyles = getVersionStyles(appVersion);

  // TOAST 自动消失
  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // 显示 TOAST
  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  // 购物车操作方法
  const addToCart = (product: ProductItem) => {
    setCartItems(prevItems => {
      // 检查商品是否已在购物车中
      const existingItem = prevItems.find(item => item.productId === product.id);
      if (existingItem) {
        // 如果已存在，增加数量
        return prevItems.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 如果不存在，添加新商品
        const newCartItem: CartItem = {
          id: `cart_${product.id}_${Date.now()}`,
          storeName: product.shop || '快准车服',
          storeLocation: product.location || '临安服务站',
          cutOffTimes: ['上午11:30', '下午14:30', '下午18:00'],
          productId: product.id,
          productName: product.title,
          productImage: product.image,
          brandPartNumber: product.specs,
          brandPart: product.brand ? `品牌件:${product.brand}` : undefined,
          location: product.location,
          price: parseFloat(product.price),
          quantity: 1,
          selected: true,
          returnPolicy: '7天无理由退货',
          guarantees: ['赔', '技'],
          specs: product.specs,
          brand: product.brand,
          volume: product.volume,
        };
        return [...prevItems, newCartItem];
      }
    });
    showToast('已加入购物车');
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
  };

  const updateCartItemQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const toggleCartItemSelect = (cartItemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAllCart = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  // 计算购物车总价和数量
  const cartTotal = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 检查页面在指定版本中是否可用
  const isPageAvailableInVersion = (targetVersion: number): boolean => {
    // 如果当前在首页，任何版本都支持
    if (activeTab === 'home' && !partsViewVisible && !selectedChatId && !settingsViewVisible && 
        !arrivalViewVisible && !productListVisible && !customerVehicleVisible && !fsPriceVisible &&
        !maintenanceVisible && !catalogVisible && !inventoryVisible && !vinScanVisible &&
        !serviceCollectionVisible && !productDetailVisible && !maintenanceManualVisible &&
        !businessAnalysisVisible && !marketingVisible && !orderDetailVisible && !workOrderListVisible &&
        !shoppingCartVisible && !feedDetailVisible && !employeeManagementVisible && !storeSettingsVisible &&
        !partsManagementVisible && !workHourListVisible && !myOrdersVisible && !purchaseOrderDetailVisible &&
        !allAppsVisible && !quickQuoteProjectsVisible && !joinFormVisible && !feedbackVisible &&
        !adminPanelVisible && !inquiryListVisible) {
      return true;
    }

    // 检查主标签页
    if (activeTab === 'chat' || activeTab === 'inquiry') {
      // 版本1不支持 chat 和 inquiry
      if (targetVersion === 1) {
        return false;
      }
    }

    // 其他主标签页（home, ai_quote, profile）和所有二级页面在所有版本都支持
    return true;
  };

  const handleCategoryClick = (id: string) => {
    if (id === 'all') {
      setPartsViewVisible(true);
      return;
    }

    const category = CATEGORIES.find((c) => c.id === id);
    if (category) {
      setProductCategory({ id: category.id, label: category.label });
      setProductListVisible(true);
      return;
    }
  };

  // 处理搜索
  const handleSearch = (keyword: string) => {
    setSearchParams({ keyword });
    setSearchResultsVisible(true);
  };

  // 处理扫码
  const handleScan = () => {
    setProductScanVisible(true);
  };

  // 处理扫码成功
  const handleScanSuccess = (result: ScanResult) => {
    setProductScanVisible(false);
    // 根据识别结果设置搜索参数
    const params: SearchParams = {};
    if (result.productName) {
      params.keyword = result.productName;
    }
    if (result.brand) {
      params.brand = result.brand;
    }
    setSearchParams(params);
    setSearchResultsVisible(true);
  };

  const handleTabChange = (id: string) => {
    // 版本1不允许切换到chat或inquiry标签页
    if (appVersion === 1 && (id === 'chat' || id === 'inquiry')) {
      return;
    }
    // 版本2允许切换到chat或inquiry标签页
    setActiveTab(id);
    // Reset secondary views when switching tabs
    setPartsViewVisible(false);
    setSelectedChatId(null);
    setSettingsViewVisible(false);
    setArrivalViewVisible(false);
    setProductListVisible(false);
    setProductCategory(null);
    setCustomerVehicleVisible(false);
    setFsPriceVisible(false);
    setMaintenanceVisible(false);
    setCatalogVisible(false);
    setInventoryVisible(false);
    setVinScanVisible(false);
    setProductDetailVisible(false);
    setServiceCollectionVisible(false);
    setMaintenanceManualVisible(false);
    setBusinessAnalysisVisible(false);
    setMarketingVisible(false);
    setOrderDetailVisible(false);
    setWorkOrderListVisible(false);
    setShoppingCartVisible(false);
    setFeedDetailVisible(false);
    setSelectedFeedId(null);
    setEmployeeManagementVisible(false);
    setStoreSettingsVisible(false);
    setPartsManagementVisible(false);
    setWorkHourListVisible(false);
    setMyOrdersVisible(false);
    setPurchaseOrderDetailVisible(false);
    setSelectedOrderId(null);
    setAllAppsVisible(false);
    setQuickQuoteProjectsVisible(false);
    setJoinFormVisible(false);
    setFeedbackVisible(false);
    setAdminPanelVisible(false);
    setSearchResultsVisible(false);
    setProductScanVisible(false);
  };

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };

  // 版本切换处理函数
  const handleVersionChange = (version: number) => {
    // 如果目标版本与当前版本相同，直接返回
    if (version === appVersion) {
      return;
    }

    // 检查目标版本是否支持当前页面
    if (!isPageAvailableInVersion(version)) {
      showToast('当前版本无此页面，无法切换');
      return;
    }

    // 如果支持，更新版本号，保持当前页面状态不变
    setAppVersion(version);
  };

  // Render Full Screen Overlays
  if (partsViewVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <PartsList 
              onBack={() => setPartsViewVisible(false)} 
              appVersion={appVersion}
              onVersionChange={handleVersionChange}
              onAdminClick={() => setAdminPanelVisible(true)}
              onSubcategoryClick={(parentCategory, subcategoryName) => {
                // 根据大类简单映射到已有的商品数据分类，其他大类统一用汽机油数据做占位
                let targetCategoryId: string = 'oil';
                if (parentCategory === '供电系统') {
                  targetCategoryId = 'battery';
                } else if (parentCategory === '制动系统') {
                  targetCategoryId = 'brake_pad';
                } else if (parentCategory === '车轮系统') {
                  targetCategoryId = 'brake_disc';
                }

                setPartsViewVisible(false);
                setProductCategory({ id: targetCategoryId, label: subcategoryName });
                setProductListVisible(true);
              }}
            />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (employeeManagementVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <EmployeeManagement 
                onBack={() => setEmployeeManagementVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (storeSettingsVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <StoreSettings 
                onBack={() => setStoreSettingsVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (partsManagementVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <PartsManagement 
                onBack={() => setPartsManagementVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (workHourListVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <WorkHourList 
                onBack={() => setWorkHourListVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (selectedChatId) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ChatDetail 
                chatId={selectedChatId} 
                onBack={() => setSelectedChatId(null)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (settingsViewVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Settings 
                onBack={() => setSettingsViewVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (orderDetailVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <OrderDetail 
                onBack={() => {
                  setOrderDetailVisible(false);
                  setActiveTab('home');
                }}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (arrivalViewVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ArrivalList 
                onBack={() => setArrivalViewVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onCreateOrder={() => {
                  setArrivalViewVisible(false);
                  setVinScanMode('order');
                  setVinScanVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (productListVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ProductList 
                onBack={() => {
                  setProductListVisible(false);
                  setProductCategory(null);
                }} 
                categoryId={productCategory?.id || 'oil'} 
                categoryLabel={productCategory?.label || '汽机油'}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onCartClick={() => {
                  setProductListVisible(false);
                  setProductCategory(null);
                  setShoppingCartVisible(true);
                }}
                addToCart={addToCart}
                cartCount={cartCount}
                cartTotal={cartTotal}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (customerVehicleVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <CustomerVehicle
                initialTab={customerVehicleTab}
                onBack={() => setCustomerVehicleVisible(false)}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (fsPriceVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <FourSPrice
                onBack={() => setFsPriceVisible(false)}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onInquiryClick={() => {
                  setFsPriceVisible(false);
                  setActiveTab('ai_quote');
                }}
                onCreateOrderClick={() => {
                  setFsPriceVisible(false);
                  setOrderDetailVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (maintenanceVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Maintenance 
                onBack={() => setMaintenanceVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (catalogVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Catalog 
                onBack={() => setCatalogVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onCartClick={() => {
                  setCatalogVisible(false);
                  setShoppingCartVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (inventoryVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <InventoryQuery 
                onBack={() => setInventoryVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (vinScanVisible) {
    return (
      <>
        <div className="min-h-screen bg-black flex justify-center">
          <div className="w-full max-w-md min-h-screen relative overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <VINScan 
                onBack={() => setVinScanVisible(false)}
                initialTab="vin"
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onSkip={() => {
                  setVinScanVisible(false);
                  if (vinScanMode === 'order') {
                    setOrderDetailVisible(true);
                  } else if (vinScanMode === 'quick_quote') {
                    setQuickQuoteProjectsVisible(true);
                  }
                }}
                onMockScan={() => {
                  setVinScanVisible(false);
                  setQuickQuoteProjectsVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (serviceCollectionVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ServiceCollection 
                onBack={() => setServiceCollectionVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (productDetailVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ProductDetail 
                onBack={() => setProductDetailVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (maintenanceManualVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <MaintenanceManual 
                onBack={() => setMaintenanceManualVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (businessAnalysisVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <BusinessAnalysis 
                onBack={() => setBusinessAnalysisVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (marketingVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Marketing 
                onBack={() => setMarketingVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (workOrderListVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <WorkOrderList 
                onBack={() => setWorkOrderListVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (shoppingCartVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ShoppingCart 
                onBack={() => setShoppingCartVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                toggleCartItemSelect={toggleCartItemSelect}
                toggleSelectAllCart={toggleSelectAllCart}
                removeFromCart={removeFromCart}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (feedDetailVisible && selectedFeedId) {
    return (
      <>
        <div className="min-h-screen bg-black flex justify-center">
          <div className="w-full max-w-md min-h-screen relative overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <FeedDetail 
                feedId={selectedFeedId}
                onBack={() => {
                  setFeedDetailVisible(false);
                  setSelectedFeedId(null);
                }}
                onHome={() => {
                  setFeedDetailVisible(false);
                  setSelectedFeedId(null);
                  setActiveTab('home');
                }}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (purchaseOrderDetailVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <PurchaseOrderDetail 
                onBack={() => {
                  setPurchaseOrderDetailVisible(false);
                  setSelectedOrderId(null);
                }}
                orderId={selectedOrderId || undefined}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (allAppsVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <AllApps 
                onBack={() => setAllAppsVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (quickQuoteProjectsVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <QuickQuoteProjects
                onBack={() => {
                  setQuickQuoteProjectsVisible(false);
                  setVinScanVisible(true);
                }}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (joinFormVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <JoinForm 
                onBack={() => setJoinFormVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (feedbackVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <FeedbackForm 
                onBack={() => setFeedbackVisible(false)} 
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (adminPanelVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <AdminPanel 
                onBack={() => setAdminPanelVisible(false)}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onMenuClick={(menuId) => {
                  setAdminPanelVisible(false);
                  if (menuId === '员工管理') {
                    setEmployeeManagementVisible(true);
                  } else if (menuId === '门店管理') {
                    setStoreSettingsVisible(true);
                  } else if (menuId === '库存管理') {
                    setInventoryVisible(true);
                  } else if (menuId === '配件管理') {
                    setPartsManagementVisible(true);
                  } else if (menuId === '工时管理') {
                    setWorkHourListVisible(true);
                  } else if (menuId === '数据分析') {
                    setBusinessAnalysisVisible(true);
                  } else if (menuId === '反馈建议') {
                    setFeedbackVisible(true);
                  }
                }}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  if (myOrdersVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <MyOrders 
                onBack={() => setMyOrdersVisible(false)} 
                initialTab={myOrdersTab}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onOrderClick={(orderId) => {
                  setSelectedOrderId(orderId);
                  setPurchaseOrderDetailVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  // Inquiry List View (from AI Quote page in version 1)
  if (inquiryListVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <InquiryList 
                onBack={() => setInquiryListVisible(false)}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onCartClick={() => {
                  setInquiryListVisible(false);
                  setShoppingCartVisible(true);
                }} 
                onAddInquiry={() => {
                  setInquiryListVisible(false);
                  setActiveTab('ai_quote');
                }}
                initialStatus={inquiryListInitialStatus}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  // Search Results View
  if (searchResultsVisible) {
    return (
      <>
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <SearchResults 
                onBack={() => setSearchResultsVisible(false)}
                searchParams={searchParams}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
                onCartClick={() => {
                  setSearchResultsVisible(false);
                  setShoppingCartVisible(true);
                }}
                onProductClick={(productId) => {
                  setSearchResultsVisible(false);
                  setProductDetailVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  // Product Scan View
  if (productScanVisible) {
    return (
      <>
        <div className="min-h-screen bg-black flex justify-center">
          <div className="w-full max-w-md min-h-screen relative overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <ProductScan 
                onBack={() => setProductScanVisible(false)}
                onScanSuccess={handleScanSuccess}
                appVersion={appVersion}
                onVersionChange={handleVersionChange}
                onAdminClick={() => setAdminPanelVisible(true)}
              />
            </Suspense>
          </div>
        </div>
        <Toast visible={toastVisible} message={toastMessage} />
      </>
    );
  }

  // AI Quote View (Main Tab)
  if (activeTab === 'ai_quote') {
      return (
        <>
          <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
              <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
                  <Suspense fallback={<LoadingFallback />}>
                    <AIQuote 
                      onBack={() => setActiveTab('home')} 
                      onViewOrderDetail={() => {
                        setSelectedOrderId(null);
                        setPurchaseOrderDetailVisible(true);
                      }}
                      onInquiryClick={appVersion === 1 ? () => setInquiryListVisible(true) : undefined}
                      appVersion={appVersion}
                      onVersionChange={handleVersionChange}
                      onAdminClick={() => setAdminPanelVisible(true)}
                    />
                  </Suspense>
              </div>
          </div>
          <Toast visible={toastVisible} message={toastMessage} />
        </>
      );
  }

  // Render Main Tabs
  return (
    <>
      <div className={`min-h-screen ${versionStyles.mainContainer.background} flex justify-center`}>
        <div className={`w-full max-w-md ${versionStyles.mainContainer.container} min-h-screen relative shadow-2xl overflow-hidden flex flex-col`}>
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Header
              appVersion={appVersion}
              onTopActionClick={(id) => {
                if (id === 'quick_quote') {
                  // 版本3、4快速报价：先进入VIN扫码页（图1）
                  setVinScanMode('quick_quote');
                  setVinScanVisible(true);
                  return;
                }
                if (id === 'price') {
                  setFsPriceVisible(true);
                } else if (id === 'maintain') {
                  setMaintenanceVisible(true);
                } else if (id === 'catalog') {
                  setCatalogVisible(true);
                } else if (id === 'inventory') {
                  setInventoryVisible(true);
                }
              }}
              onCartClick={() => setShoppingCartVisible(true)}
              onAdminClick={() => setAdminPanelVisible(true)}
              onVersionChange={handleVersionChange}
              onSearch={handleSearch}
              onScan={handleScan}
            />
            {appVersion >= 3 && (
              <>
                <StoreCard
                  appVersion={appVersion}
                  onArrivalClick={() => setArrivalViewVisible(true)}
                  onManagementClick={(id) => {
                    if (id === 'customer_manage') {
                      setCustomerVehicleTab('customer');
                      setCustomerVehicleVisible(true);
                    } else if (id === 'vehicle_manage') {
                      setCustomerVehicleTab('vehicle');
                      setCustomerVehicleVisible(true);
                    } else if (id === 'bill') {
                      setVinScanMode('order');
                      setVinScanVisible(true);
                    } else if (id === 'workorders') {
                      setWorkOrderListVisible(true);
                    } else if (id === 'fast_pay') {
                      setServiceCollectionVisible(true);
                    } else if (id === 'manual') {
                      setMaintenanceManualVisible(true);
                    } else if (id === 'reports') {
                      setBusinessAnalysisVisible(true);
                    } else if (id === 'marketing') {
                      setMarketingVisible(true);
                    } else if (id === 'all_apps') {
                      setAllAppsVisible(true);
                    }
                  }}
                />
                <Banner appVersion={appVersion} onClick={() => setProductDetailVisible(true)} />
              </>
            )}
            {appVersion < 3 && (
              <Banner appVersion={appVersion} onClick={() => setProductDetailVisible(true)} />
            )}
            <CategoryGrid appVersion={appVersion} onCategoryClick={handleCategoryClick} />
            <VideoFeed 
              onFeedClick={(feedId) => {
                setSelectedFeedId(feedId);
                setFeedDetailVisible(true);
              }}
            />
          </div>
        )}

        {activeTab === 'chat' && appVersion >= 2 && (
           <Suspense fallback={<LoadingFallback />}>
             <ChatList 
               onChatClick={handleChatClick}
               appVersion={appVersion}
               onVersionChange={handleVersionChange}
               onAdminClick={() => setAdminPanelVisible(true)}
             />
           </Suspense>
        )}
        
        {activeTab === 'inquiry' && appVersion >= 2 && (
           <Suspense fallback={<LoadingFallback />}>
             <InquiryList 
               onCartClick={() => setShoppingCartVisible(true)} 
               onAddInquiry={() => setActiveTab('ai_quote')}
               appVersion={appVersion}
               onVersionChange={handleVersionChange}
               onAdminClick={() => setAdminPanelVisible(true)}
             />
           </Suspense>
        )}

        {activeTab === 'profile' && (
           <Suspense fallback={<LoadingFallback />}>
             <Profile 
               appVersion={appVersion}
               onSettingsClick={() => setSettingsViewVisible(true)}
               onVersionChange={handleVersionChange}
               onAdminClick={() => setAdminPanelVisible(true)}
              onMenuClick={(menuId) => {
                if (menuId === '员工管理') {
                  setEmployeeManagementVisible(true);
                } else if (menuId === '门店管理') {
                  setStoreSettingsVisible(true);
                } else if (menuId === '库存管理') {
                  setInventoryVisible(true);
                } else if (menuId === '配件管理') {
                  setPartsManagementVisible(true);
                } else if (menuId === '工时管理' || menuId === '项目管理') {
                  setWorkHourListVisible(true);
                }
              }}
               onOrderClick={(orderType) => {
                 setMyOrdersTab(orderType);
                 setMyOrdersVisible(true);
               }}
               onInquiryClick={appVersion === 1 ? (status) => {
                 setInquiryListInitialStatus(status);
                 setInquiryListVisible(true);
               } : undefined}
               onJoinClick={() => setJoinFormVisible(true)}
               onFeedbackClick={() => setFeedbackVisible(true)}
             />
           </Suspense>
        )}

        <BottomNav appVersion={appVersion} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
      <Toast visible={toastVisible} message={toastMessage} />
    </>
  );
};

export default App;