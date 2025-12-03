import React, { useState } from 'react';
import Header from './components/Header';
import StoreCard from './components/StoreCard';
import Banner from './components/Banner';
import CategoryGrid from './components/CategoryGrid';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import PartsList from './components/PartsList';
import ChatList from './components/ChatList';
import ChatDetail from './components/ChatDetail';
import InquiryList from './components/InquiryList';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ArrivalList from './components/ArrivalList';
import AIQuote from './components/AIQuote';
import ProductList from './components/ProductList';
import { CATEGORIES } from './constants';
import CustomerVehicle from './components/CustomerVehicle';
import FourSPrice from './components/FourSPrice';
import Maintenance from './components/Maintenance';
import Catalog from './components/Catalog';
import InventoryQuery from './components/InventoryQuery';
import VINScan from './components/VINScan';
import ServiceCollection from './components/ServiceCollection';
import ProductDetail from './components/ProductDetail';
import MaintenanceManual from './components/MaintenanceManual';
import BusinessAnalysis from './components/BusinessAnalysis';
import Marketing from './components/Marketing';
import OrderDetail from './components/OrderDetail';
import PurchaseOrderDetail from './components/PurchaseOrderDetail';
import WorkOrderList from './components/WorkOrderList';
import ShoppingCart from './components/ShoppingCart';
import FeedDetail from './components/FeedDetail';
import EmployeeManagement from './components/EmployeeManagement';
import StoreSettings from './components/StoreSettings';
import Inventory from './components/Inventory';
import PartsManagement from './components/PartsManagement';
import WorkHourList from './components/WorkHourList';
import MyOrders from './components/MyOrders';
import { OrderTab } from './components/MyOrders';
import { getVersionStyles } from './versionStyles';
import AllApps from './components/AllApps';

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
            <PartsList onBack={() => setPartsViewVisible(false)} />
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
            <ChatDetail 
              chatId={selectedChatId} 
              onBack={() => setSelectedChatId(null)} 
            />
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
            <Settings onBack={() => setSettingsViewVisible(false)} />
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
            <OrderDetail 
              onBack={() => {
                setOrderDetailVisible(false);
                setActiveTab('home');
              }} 
            />
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
            <ArrivalList 
              onBack={() => setArrivalViewVisible(false)} 
              onCreateOrder={() => {
                setArrivalViewVisible(false);
                setVinScanVisible(true);
              }}
            />
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
            <CustomerVehicle
              initialTab={customerVehicleTab}
              onBack={() => setCustomerVehicleVisible(false)}
            />
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
            <FourSPrice onBack={() => setFsPriceVisible(false)} />
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
            <Maintenance onBack={() => setMaintenanceVisible(false)} />
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
            <Catalog 
              onBack={() => setCatalogVisible(false)} 
              onCartClick={() => {
                setCatalogVisible(false);
                setShoppingCartVisible(true);
              }}
            />
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
            <InventoryQuery onBack={() => setInventoryVisible(false)} />
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
            <VINScan 
              onBack={() => setVinScanVisible(false)}
              initialTab="vin"
              onSkip={() => {
                setVinScanVisible(false);
                setOrderDetailVisible(true);
              }}
            />
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
            <ServiceCollection onBack={() => setServiceCollectionVisible(false)} />
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
            <ProductDetail onBack={() => setProductDetailVisible(false)} />
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
            <MaintenanceManual onBack={() => setMaintenanceManualVisible(false)} />
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
            <BusinessAnalysis onBack={() => setBusinessAnalysisVisible(false)} />
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
            <Marketing onBack={() => setMarketingVisible(false)} />
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
            <WorkOrderList onBack={() => setWorkOrderListVisible(false)} />
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
            <ShoppingCart onBack={() => setShoppingCartVisible(false)} />
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
            <FeedDetail 
              feedId={selectedFeedId}
              onBack={() => {
                setFeedDetailVisible(false);
                setSelectedFeedId(null);
              }} 
            />
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
            <PurchaseOrderDetail 
              onBack={() => {
                setPurchaseOrderDetailVisible(false);
                setSelectedOrderId(null);
              }}
              orderId={selectedOrderId || undefined}
            />
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
            <AllApps onBack={() => setAllAppsVisible(false)} />
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
            <MyOrders 
              onBack={() => setMyOrdersVisible(false)} 
              initialTab={myOrdersTab}
              onOrderClick={(orderId) => {
                setSelectedOrderId(orderId);
                setPurchaseOrderDetailVisible(true);
              }}
            />
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
                  <AIQuote 
                    onBack={() => setActiveTab('home')} 
                    onViewOrderDetail={() => {
                      setSelectedOrderId(null);
                      setPurchaseOrderDetailVisible(true);
                    }}
                  />
              </div>
          </div>
        </>
      );
  }

  // Render Main Tabs
  return (
    <>
      <LeftSideButtons />
      <div className={`min-h-screen ${versionStyles.mainContainer.background} flex justify-center`}>
        <div className={`w-full max-w-md ${versionStyles.mainContainer.container} min-h-screen relative shadow-2xl overflow-hidden flex flex-col`}>
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Header
              appVersion={appVersion}
              onTopActionClick={(id) => {
                if (id === 'quick_quote') {
                  setActiveTab('ai_quote');
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
           <ChatList onChatClick={handleChatClick} />
        )}
        
        {activeTab === 'inquiry' && appVersion >= 2 && (
           <InquiryList 
             onCartClick={() => setShoppingCartVisible(true)} 
             onAddInquiry={() => setActiveTab('ai_quote')}
           />
        )}

        {activeTab === 'profile' && (
           <Profile 
             appVersion={appVersion}
             onSettingsClick={() => setSettingsViewVisible(true)}
             onOrderClick={(orderType) => {
               setMyOrdersTab(orderType);
               setMyOrdersVisible(true);
             }}
           />
        )}

        <BottomNav appVersion={appVersion} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </>
  );
};

export default App;