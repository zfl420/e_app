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

  if (arrivalViewVisible) {
    return (
        <div className="min-h-screen bg-background flex justify-center">
          <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
            <ArrivalList onBack={() => setArrivalViewVisible(false)} />
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
                  setFsPriceVisible(true);
                } else if (id === 'maintain') {
                  setMaintenanceVisible(true);
                } else if (id === 'catalog') {
                  setCatalogVisible(true);
                } else if (id === 'inventory') {
                  setInventoryVisible(true);
                }
              }}
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
                }
              }}
            />
            <Banner />
            <CategoryGrid onCategoryClick={handleCategoryClick} />
            <VideoFeed />
          </div>
        )}

        {activeTab === 'chat' && (
           <ChatList onChatClick={handleChatClick} />
        )}
        
        {activeTab === 'inquiry' && (
           <InquiryList />
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