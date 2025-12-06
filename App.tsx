import React, { useState, Suspense, lazy } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
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

// 加载中占位组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">加载中...</div>
  </div>
);

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

  // 获取当前版本的样式配置
  const versionStyles = getVersionStyles(appVersion);

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
  };

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };

  // Left Side Buttons Component
  const LeftSideButtons = () => {
    const buttonColors = [
      'bg-gray-100', // 按钮1 - 最浅
      'bg-gray-200', // 按钮2
      'bg-gray-300', // 按钮3
      'bg-gray-400', // 按钮4 - 最深
    ];
    
    const handleVersionChange = (version: number) => {
      setAppVersion(version);
      // 切换版本时，统一回到该版本的首页
      setActiveTab('home');

      // 重置所有二级页面/弹层状态，回到首页初始态
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
      setJoinFormVisible(false);
      setFeedbackVisible(false);
      setAdminPanelVisible(false);
      setInquiryListVisible(false);
    };
    
    return (
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => handleVersionChange(num)}
            className={`w-10 h-10 ${buttonColors[num - 1]} rounded-xl shadow-lg border-2 ${
              appVersion === num ? 'border-secondary' : 'border-gray-200'
            } flex items-center justify-center text-gray-700 font-semibold text-sm hover:opacity-80 active:scale-95 transition-all`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  // Render Full Screen Overlays
  if (partsViewVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <PartsList 
              onBack={() => setPartsViewVisible(false)} 
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
      </>
    );
  }

  if (employeeManagementVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <EmployeeManagement onBack={() => setEmployeeManagementVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (storeSettingsVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <StoreSettings onBack={() => setStoreSettingsVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (partsManagementVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <PartsManagement onBack={() => setPartsManagementVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (workHourListVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <WorkHourList onBack={() => setWorkHourListVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (selectedChatId) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ChatDetail 
                chatId={selectedChatId} 
                onBack={() => setSelectedChatId(null)} 
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (settingsViewVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Settings onBack={() => setSettingsViewVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (orderDetailVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <OrderDetail 
                onBack={() => {
                  setOrderDetailVisible(false);
                  setActiveTab('home');
                }} 
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (arrivalViewVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ArrivalList 
                onBack={() => setArrivalViewVisible(false)} 
                onCreateOrder={() => {
                  setArrivalViewVisible(false);
                  setVinScanMode('order');
                  setVinScanVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (productListVisible) {
    return (
      <>
        <LeftSideButtons />
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
                onCartClick={() => {
                  setProductListVisible(false);
                  setProductCategory(null);
                  setShoppingCartVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (customerVehicleVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <CustomerVehicle
                initialTab={customerVehicleTab}
                onBack={() => setCustomerVehicleVisible(false)}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (fsPriceVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <FourSPrice
                onBack={() => setFsPriceVisible(false)}
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
      </>
    );
  }

  if (maintenanceVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Maintenance onBack={() => setMaintenanceVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (catalogVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Catalog 
                onBack={() => setCatalogVisible(false)} 
                onCartClick={() => {
                  setCatalogVisible(false);
                  setShoppingCartVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (inventoryVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <InventoryQuery onBack={() => setInventoryVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (vinScanVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className="min-h-screen bg-black flex justify-center">
          <div className="w-full max-w-md min-h-screen relative overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <VINScan 
                onBack={() => setVinScanVisible(false)}
                initialTab="vin"
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
      </>
    );
  }

  if (serviceCollectionVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ServiceCollection onBack={() => setServiceCollectionVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (productDetailVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ProductDetail onBack={() => setProductDetailVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (maintenanceManualVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <MaintenanceManual onBack={() => setMaintenanceManualVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (businessAnalysisVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <BusinessAnalysis onBack={() => setBusinessAnalysisVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (marketingVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <Marketing onBack={() => setMarketingVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (workOrderListVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <WorkOrderList onBack={() => setWorkOrderListVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (shoppingCartVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <ShoppingCart onBack={() => setShoppingCartVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (feedDetailVisible && selectedFeedId) {
    return (
      <>
        <LeftSideButtons />
        <div className="min-h-screen bg-black flex justify-center">
          <div className="w-full max-w-md min-h-screen relative overflow-hidden">
            <Suspense fallback={<LoadingFallback />}>
              <FeedDetail 
                feedId={selectedFeedId}
                onBack={() => {
                  setFeedDetailVisible(false);
                  setSelectedFeedId(null);
                }} 
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (purchaseOrderDetailVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <PurchaseOrderDetail 
                onBack={() => {
                  setPurchaseOrderDetailVisible(false);
                  setSelectedOrderId(null);
                }}
                orderId={selectedOrderId || undefined}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (allAppsVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <AllApps onBack={() => setAllAppsVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (quickQuoteProjectsVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <QuickQuoteProjects
                onBack={() => {
                  setQuickQuoteProjectsVisible(false);
                  setVinScanVisible(true);
                }}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (joinFormVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <JoinForm onBack={() => setJoinFormVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (feedbackVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <FeedbackForm onBack={() => setFeedbackVisible(false)} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  if (adminPanelVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <AdminPanel 
                onBack={() => setAdminPanelVisible(false)}
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
      </>
    );
  }

  if (myOrdersVisible) {
    return (
      <>
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <MyOrders 
                onBack={() => setMyOrdersVisible(false)} 
                initialTab={myOrdersTab}
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
        <LeftSideButtons />
        <div className={`min-h-screen ${versionStyles.overlay.background} flex justify-center`}>
          <div className={`w-full max-w-md ${versionStyles.overlay.container} min-h-screen relative shadow-2xl overflow-hidden`}>
            <Suspense fallback={<LoadingFallback />}>
              <InquiryList 
                onBack={() => setInquiryListVisible(false)}
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
      </>
    );
  }

  // AI Quote View (Main Tab)
  if (activeTab === 'ai_quote') {
      return (
        <>
          <LeftSideButtons />
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
                    />
                  </Suspense>
              </div>
          </div>
        </>
      );
  }

  // Render Main Tabs
  return (
    <>
      <LeftSideButtons />
      {/* Settings Button - 整个页面右上角的设置按钮 */}
      <button
        onClick={() => setAdminPanelVisible(true)}
        className="fixed top-4 right-4 z-50 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-gray-200"
        title="管理后台"
      >
        <SettingsIcon className="w-6 h-6 text-gray-700" />
      </button>
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
             <ChatList onChatClick={handleChatClick} />
           </Suspense>
        )}
        
        {activeTab === 'inquiry' && appVersion >= 2 && (
           <Suspense fallback={<LoadingFallback />}>
             <InquiryList 
               onCartClick={() => setShoppingCartVisible(true)} 
               onAddInquiry={() => setActiveTab('ai_quote')}
             />
           </Suspense>
        )}

        {activeTab === 'profile' && (
           <Suspense fallback={<LoadingFallback />}>
             <Profile 
               appVersion={appVersion}
               onSettingsClick={() => setSettingsViewVisible(true)}
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
    </>
  );
};

export default App;