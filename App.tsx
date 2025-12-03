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
import WorkOrderList from './components/WorkOrderList';
import ShoppingCart from './components/ShoppingCart';

const App: React.FC = () => {
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
  };

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };

  // Render Full Screen Overlays
  if (partsViewVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <PartsList onBack={() => setPartsViewVisible(false)} />
        </div>
      </div>
    );
  }

  if (selectedChatId) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <ChatDetail 
            chatId={selectedChatId} 
            onBack={() => setSelectedChatId(null)} 
          />
        </div>
      </div>
    );
  }

  if (settingsViewVisible) {
    return (
        <div className="min-h-screen bg-background flex justify-center">
          <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
            <Settings onBack={() => setSettingsViewVisible(false)} />
          </div>
        </div>
      );
  }

  if (orderDetailVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <OrderDetail 
            onBack={() => {
              setOrderDetailVisible(false);
              setActiveTab('home');
            }} 
          />
        </div>
      </div>
    );
  }

  if (arrivalViewVisible) {
    return (
        <div className="min-h-screen bg-background flex justify-center">
          <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
            <ArrivalList 
              onBack={() => setArrivalViewVisible(false)} 
              onCreateOrder={() => {
                setArrivalViewVisible(false);
                setVinScanVisible(true);
              }}
            />
          </div>
        </div>
      );
  }

  if (productListVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <ProductList 
            onBack={() => {
              setProductListVisible(false);
              setProductCategory(null);
            }} 
            categoryId={productCategory?.id || 'oil'} 
            categoryLabel={productCategory?.label || '汽机油'} 
          />
        </div>
      </div>
    );
  }

  if (customerVehicleVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <CustomerVehicle
            initialTab={customerVehicleTab}
            onBack={() => setCustomerVehicleVisible(false)}
          />
        </div>
      </div>
    );
  }

  if (fsPriceVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <FourSPrice onBack={() => setFsPriceVisible(false)} />
        </div>
      </div>
    );
  }

  if (maintenanceVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <Maintenance onBack={() => setMaintenanceVisible(false)} />
        </div>
      </div>
    );
  }

  if (catalogVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <Catalog onBack={() => setCatalogVisible(false)} />
        </div>
      </div>
    );
  }

  if (inventoryVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <InventoryQuery onBack={() => setInventoryVisible(false)} />
        </div>
      </div>
    );
  }

  if (vinScanVisible) {
    return (
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
    );
  }

  if (serviceCollectionVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <ServiceCollection onBack={() => setServiceCollectionVisible(false)} />
        </div>
      </div>
    );
  }

  if (productDetailVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <ProductDetail onBack={() => setProductDetailVisible(false)} />
        </div>
      </div>
    );
  }

  if (maintenanceManualVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <MaintenanceManual onBack={() => setMaintenanceManualVisible(false)} />
        </div>
      </div>
    );
  }

  if (businessAnalysisVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <BusinessAnalysis onBack={() => setBusinessAnalysisVisible(false)} />
        </div>
      </div>
    );
  }

  if (marketingVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <Marketing onBack={() => setMarketingVisible(false)} />
        </div>
      </div>
    );
  }

  if (workOrderListVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <WorkOrderList onBack={() => setWorkOrderListVisible(false)} />
        </div>
      </div>
    );
  }

  if (shoppingCartVisible) {
    return (
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
          <ShoppingCart onBack={() => setShoppingCartVisible(false)} />
        </div>
      </div>
    );
  }

  // AI Quote View (Main Tab)
  if (activeTab === 'ai_quote') {
      return (
        <div className="min-h-screen bg-background flex justify-center">
            <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
                <AIQuote onBack={() => setActiveTab('home')} />
            </div>
        </div>
      );
  }

  // Render Main Tabs
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Header
              onTopActionClick={(id) => {
                if (id === 'price') {
                  setBusinessAnalysisVisible(true);
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
            <StoreCard
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
                }
              }}
            />
            <Banner onClick={() => setProductDetailVisible(true)} />
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <VideoFeed />
          </div>
        )}

        {activeTab === 'chat' && (
           <ChatList onChatClick={handleChatClick} />
        )}
        
        {activeTab === 'inquiry' && (
           <InquiryList onCartClick={() => setShoppingCartVisible(true)} />
        )}

        {activeTab === 'profile' && (
           <Profile onSettingsClick={() => setSettingsViewVisible(true)} />
        )}

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
};

export default App;