import React, { useState } from 'react';
import { ChevronLeft, ScanLine, ChevronRight, ShoppingCart } from 'lucide-react';
import StatusBar from './StatusBar';

type TabType = 'vin' | 'part';
type Step = 'query' | 'parts_list' | 'brand_select' | 'oe_input' | 'part_diagram';

interface HistoryVehicle {
  id: string;
  brandLogo: string;
  title: string;
  vin: string;
  date: string;
}

interface CategoryItem {
  id: string;
  number: string;
  title: string;
  selected?: boolean;
}

interface PartDocument {
  id: string;
  number: string;
  title: string;
  image: string;
}

interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
}

const HISTORY_VEHICLES: HistoryVehicle[] = [
  {
    id: 'v1',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
    title: '宝马 120i 2021 1.5T 双离合',
    vin: 'LBV2W5102MM154515',
    date: '11月19日',
  },
  {
    id: 'v2',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png',
    title: '奔驰 C 260 Tourer 48V 2019 1.5T 手自一体',
    vin: 'WDDWH7HB6XF883297',
    date: '11月19日',
  },
];

const CATEGORIES: CategoryItem[] = [
  { id: 'tech', number: '01', title: '技术文献', selected: true },
  { id: 'maintain', number: '02', title: '保养和维修范围' },
  { id: 'install', number: '03', title: '加装 / 改装/...' },
  { id: 'engine', number: '11', title: '发动机' },
  { id: 'engine_elec', number: '12', title: '发动机电气系统' },
  { id: 'mixture', number: '13', title: '混合气制备和...' },
  { id: 'fuel', number: '16', title: '燃油供应' },
  { id: 'cooling', number: '17', title: '冷却装置' },
  { id: 'exhaust', number: '18', title: '排气装置' },
  { id: 'engine_trans', number: '22', title: '发动机和变...' },
  { id: 'shift', number: '25', title: '换档机构' },
  { id: 'clutch', number: '28', title: '双离合器变...' },
  { id: 'front_axle', number: '31', title: '前桥' },
];

const PART_DOCUMENTS: PartDocument[] = [
  { id: 'd1', number: '01_0575', title: 'CD 维修说...', image: 'https://via.placeholder.com/150x200?text=CD' },
  { id: 'd2', number: '01_0576', title: '广告说明...', image: 'https://via.placeholder.com/150x200?text=AD' },
  { id: 'd3', number: '01_0577', title: 'CD 历史零...', image: 'https://via.placeholder.com/150x200?text=CD' },
  { id: 'd4', number: '01_0579', title: '广告说明...', image: 'https://via.placeholder.com/150x200?text=AD' },
  { id: 'd5', number: '01_1149', title: '电路图', image: 'https://via.placeholder.com/150x200?text=Circuit' },
  { id: 'd6', number: '01_1154', title: 'EG 合格证书', image: 'https://via.placeholder.com/150x200?text=Cert' },
];

const BRANDS: Brand[] = [
  { id: 'audi', name: '奥迪', nameEn: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png' },
  { id: 'alfa', name: '阿尔法·罗密欧', nameEn: 'Alfa Romeo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Alfa_Romeo_logo.svg/1200px-Alfa_Romeo_logo.svg.png' },
  { id: 'aito', name: '问界', nameEn: 'AITO', logo: 'https://via.placeholder.com/80x80?text=AITO' },
  { id: 'arcfox', name: 'ARCFOX', nameEn: 'ARCFOX', logo: 'https://via.placeholder.com/80x80?text=ARCFOX' },
  { id: 'avatr', name: '阿维塔', nameEn: 'Avatr', logo: 'https://via.placeholder.com/80x80?text=Avatr' },
  { id: 'benz', name: '奔驰', nameEn: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png' },
  { id: 'beijing', name: 'BEIJING', nameEn: 'BEIJING', logo: 'https://via.placeholder.com/80x80?text=BEIJING' },
  { id: 'baojun', name: '宝骏', nameEn: 'Baojun', logo: 'https://via.placeholder.com/80x80?text=宝骏' },
  { id: 'buick', name: '别克', nameEn: 'Buick', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Buick_logo.svg/1200px-Buick_logo.svg.png' },
  { id: 'bentley', name: '宾利', nameEn: 'Bentley', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bentley_logo.svg/1200px-Bentley_logo.svg.png' },
  { id: 'bmw', name: '宝马', nameEn: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png' },
  { id: 'baic', name: '北汽', nameEn: 'BAIC', logo: 'https://via.placeholder.com/80x80?text=BAIC' },
  { id: 'porsche', name: '保时捷', nameEn: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Porsche_logo.svg/1200px-Porsche_logo.svg.png' },
  { id: 'honda', name: '本田', nameEn: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/83/Honda_logo.svg/1200px-Honda_logo.svg.png' },
  { id: 'byd', name: '比亚迪', nameEn: 'BYD', logo: 'https://via.placeholder.com/80x80?text=BYD' },
  { id: 'changan', name: '长安', nameEn: 'Changan', logo: 'https://via.placeholder.com/80x80?text=长安' },
  { id: 'changan_deepal', name: '长安深蓝', nameEn: 'Changan Deepal', logo: 'https://via.placeholder.com/80x80?text=深蓝' },
  { id: 'changan_commercial', name: '长安商用', nameEn: 'Changan Commercial', logo: 'https://via.placeholder.com/80x80?text=商用' },
  { id: 'trumpchi', name: '传祺', nameEn: 'Trumpchi', logo: 'https://via.placeholder.com/80x80?text=传祺' },
  { id: 'dodge', name: '道奇', nameEn: 'Dodge', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dodge_logo.svg/1200px-Dodge_logo.svg.png' },
  { id: 'vw', name: '大众', nameEn: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png' },
  { id: 'fangchengbao', name: '方程豹', nameEn: 'Fangchengbao', logo: 'https://via.placeholder.com/80x80?text=方程豹' },
  { id: 'toyota', name: '丰田', nameEn: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png' },
  { id: 'ford', name: '福特', nameEn: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_logo_flat.svg/1200px-Ford_logo_flat.svg.png' },
  { id: 'gac_aion', name: '广汽埃安', nameEn: 'GAC Aion', logo: 'https://via.placeholder.com/80x80?text=埃安' },
  { id: 'hongqi', name: '红旗', nameEn: 'Hongqi', logo: 'https://via.placeholder.com/80x80?text=红旗' },
  { id: 'jaguar', name: '捷豹', nameEn: 'Jaguar', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Jaguar_logo.svg/1200px-Jaguar_logo.svg.png' },
  { id: 'geometry', name: '几何', nameEn: 'Geometry', logo: 'https://via.placeholder.com/80x80?text=几何' },
  { id: 'geely', name: '吉利', nameEn: 'Geely', logo: 'https://via.placeholder.com/80x80?text=吉利' },
  { id: 'jeep', name: '吉普', nameEn: 'Jeep', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Jeep_logo.svg/1200px-Jeep_logo.svg.png' },
  { id: 'jetour', name: '捷途', nameEn: 'Jetour', logo: 'https://via.placeholder.com/80x80?text=捷途' },
  { id: 'cadillac', name: '凯迪拉克', nameEn: 'Cadillac', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cadillac_logo.svg/1200px-Cadillac_logo.svg.png' },
  { id: 'chrysler', name: '克莱斯勒', nameEn: 'Chrysler', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Chrysler_logo.svg/1200px-Chrysler_logo.svg.png' },
  { id: 'landrover', name: '路虎', nameEn: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Land_Rover_logo.svg/1200px-Land_Rover_logo.svg.png' },
  { id: 'lexus', name: '雷克萨斯', nameEn: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Lexus_logo_2011.svg/1200px-Lexus_logo_2011.svg.png' },
  { id: 'mg', name: '名爵', nameEn: 'MG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/MG_logo.svg/1200px-MG_logo.svg.png' },
  { id: 'maserati', name: '玛莎拉蒂', nameEn: 'Maserati', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Maserati_logo.svg/1200px-Maserati_logo.svg.png' },
  { id: 'mazda', name: '马自达', nameEn: 'Mazda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Mazda_logo.svg/1200px-Mazda_logo.svg.png' },
  { id: 'acura', name: '讴歌', nameEn: 'Acura', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Acura_logo.svg/1200px-Acura_logo.svg.png' },
  { id: 'oshan', name: '欧尚', nameEn: 'Oshan', logo: 'https://via.placeholder.com/80x80?text=欧尚' },
  { id: 'chery', name: '奇瑞', nameEn: 'Chery', logo: 'https://via.placeholder.com/80x80?text=奇瑞' },
  { id: 'qiyuan', name: '启源', nameEn: 'Qiyuan', logo: 'https://via.placeholder.com/80x80?text=启源' },
  { id: 'kia', name: '起亚', nameEn: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kia_logo.svg/1200px-Kia_logo.svg.png' },
  { id: 'nissan', name: '日产', nameEn: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nissan_logo.svg/1200px-Nissan_logo.svg.png' },
];

interface CatalogProps {
  onBack: () => void;
  onCartClick?: () => void;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ onBack, onCartClick, appVersion, onVersionChange, onAdminClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('vin');
  const [step, setStep] = useState<Step>('query');
  const [vinInput, setVinInput] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<HistoryVehicle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(CATEGORIES[0]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [oeInput, setOeInput] = useState('');

  const handleBack = () => {
    if (step === 'query') {
      onBack();
      return;
    }
    if (step === 'parts_list') {
      setStep('query');
      setSelectedVehicle(null);
      return;
    }
    if (step === 'brand_select') {
      onBack();
      return;
    }
    if (step === 'oe_input') {
      setStep('brand_select');
      setSelectedBrand(null);
      setOeInput('');
      return;
    }
    if (step === 'part_diagram') {
      setStep('oe_input');
      return;
    }
  };

  const handleVehicleClick = (vehicle: HistoryVehicle) => {
    setSelectedVehicle(vehicle);
    setStep('parts_list');
  };

  const handleCategoryClick = (category: CategoryItem) => {
    setSelectedCategory(category);
  };

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setStep('oe_input');
  };

  const handleOeSubmit = () => {
    if (oeInput.trim()) {
      setStep('part_diagram');
    }
  };

  const renderHeader = () => {
    if (step === 'parts_list' && selectedVehicle) {
      return (
        <div className="bg-white sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 pt-3 pb-3 border-b border-gray-100">
            <button onClick={handleBack} className="p-1 -ml-2">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <div className="flex-1 text-center text-base font-semibold text-gray-900">
              {selectedVehicle.title}
            </div>
            <button 
              onClick={onCartClick}
              className="relative p-1"
            >
              <ShoppingCart className="w-6 h-6 text-gray-800" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center border-2 border-white">
                1
              </span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-3 border-b border-gray-100">
          <button onClick={handleBack} className="p-1 -ml-1">
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <div className="flex-1 flex justify-center gap-8">
            <button
              onClick={() => {
                setActiveTab('vin');
                setStep('query');
                setSelectedVehicle(null);
                setSelectedBrand(null);
                setOeInput('');
              }}
              className={`text-base font-semibold relative ${
                activeTab === 'vin' ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              VIN码查询
              {activeTab === 'vin' && (
                <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-red-500" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('part');
                setStep('brand_select');
                setSelectedBrand(null);
                setOeInput('');
              }}
              className={`text-base font-semibold relative ${
                activeTab === 'part' ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              零件号查询
              {activeTab === 'part' && (
                <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-red-500" />
              )}
            </button>
          </div>
          {onCartClick && (
            <button 
              onClick={onCartClick}
              className="relative p-1"
            >
              <ShoppingCart className="w-6 h-6 text-gray-800" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center border-2 border-white">
                1
              </span>
            </button>
          )}
          {!onCartClick && <div className="w-10" />}
        </div>
      </div>
    );
  };

  const renderVinQuery = () => (
    <div className="px-4 py-6">
      <div className="relative">
        <input
          type="text"
          value={vinInput}
          onChange={(e) => setVinInput(e.target.value)}
          placeholder="请输入VIN码"
          maxLength={17}
          className="w-full h-12 px-4 pr-12 border-2 border-red-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
            <ScanLine className="w-4 h-4 text-gray-400" />
          </div>
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span>已输入{vinInput.length}/17位</span>
        <button className="text-blue-500">查看支持品牌&gt;</button>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-700 mb-3">最近使用</div>
        <div className="space-y-2">
          {HISTORY_VEHICLES.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => handleVehicleClick(vehicle)}
              className="w-full bg-white rounded-lg p-3 flex items-center justify-between shadow-sm active:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <span className="text-xs text-gray-600 font-medium line-clamp-1 px-1 text-center">
                    {vehicle.title.split(' ')[0]}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{vehicle.title}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">{vehicle.vin}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{vehicle.date}</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPartsList = () => {
    if (!selectedVehicle) return null;

    return (
      <div className="flex h-[calc(100vh-60px)]">
        {/* 左侧分类菜单 */}
        <div className="w-24 bg-white border-r border-gray-100 overflow-y-auto">
          {CATEGORIES.map((category) => {
            const isSelected = category.id === selectedCategory?.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`w-full px-2 py-3 text-left border-l-2 ${
                  isSelected
                    ? 'border-red-500 bg-red-50 text-red-600 font-semibold'
                    : 'border-transparent text-gray-600'
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs">{category.number}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                      1
                    </span>
                  )}
                </div>
                <div className="text-[11px] leading-tight">{category.title}</div>
              </button>
            );
          })}
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              {selectedCategory?.number} {selectedCategory?.title}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PART_DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-lg p-3 shadow-sm cursor-pointer active:scale-95 transition-transform"
                >
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full aspect-[3/4] object-cover rounded mb-2 bg-gray-100"
                  />
                  <div className="text-xs text-gray-900 font-medium">{doc.number}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{doc.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBrandSelect = () => (
    <div className="px-4 py-6">
      <div className="text-sm text-gray-700 mb-4">请先选择品牌</div>
      <div className="grid grid-cols-5 gap-4">
        {BRANDS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleBrandClick(brand)}
            className="flex flex-col items-center gap-2 active:opacity-80"
          >
            <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-[10px] text-gray-600 font-medium text-center px-1 leading-tight">
                {brand.name.length > 4 ? brand.name.substring(0, 4) : brand.name}
              </span>
            </div>
            <div className="text-[11px] text-gray-700 text-center leading-tight">
              {brand.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderOeInput = () => (
    <div className="px-4 py-6">
      <div className="mb-4">
        <div className="text-sm text-gray-700 mb-2">已选择品牌：{selectedBrand?.name}</div>
        <div className="relative">
          <input
            type="text"
            value={oeInput}
            onChange={(e) => setOeInput(e.target.value)}
            placeholder="请输入OE号"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
          />
        </div>
      </div>
      <button
        onClick={handleOeSubmit}
        disabled={!oeInput.trim()}
        className="w-full h-12 rounded-lg bg-red-500 text-white text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        查询
      </button>
    </div>
  );

  const renderPartDiagram = () => (
    <div className="px-4 py-6">
      <div className="mb-4">
        <div className="text-sm text-gray-700 mb-1">品牌：{selectedBrand?.name}</div>
        <div className="text-sm text-gray-700 mb-4">OE号：{oeInput}</div>
      </div>
      
      {/* 零件爆炸图 */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="text-sm font-semibold text-gray-900 mb-3">零件图</div>
        <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <img
            src="https://via.placeholder.com/400x400?text=Part+Diagram"
            alt="零件图"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* 零件列表 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div>
              <div className="text-sm font-medium text-gray-900">零件名称</div>
              <div className="text-xs text-gray-500">OE: {oeInput}</div>
            </div>
            <button className="px-3 py-1 bg-red-500 text-white text-xs rounded">
              查看详情
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 h-12 rounded-lg border border-gray-300 text-sm text-gray-800 bg-white">
          加入购物车
        </button>
        <button className="flex-1 h-12 rounded-lg bg-red-500 text-white text-sm font-semibold">
          去询价
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {renderHeader()}

      <div className="flex-1 overflow-y-auto">
        {step === 'query' && activeTab === 'vin' && renderVinQuery()}
        {step === 'parts_list' && renderPartsList()}
        {step === 'brand_select' && renderBrandSelect()}
        {step === 'oe_input' && renderOeInput()}
        {step === 'part_diagram' && renderPartDiagram()}
      </div>

      {/* 底部购物车按钮（仅在parts_list和part_diagram显示） */}
      {(step === 'parts_list' || step === 'part_diagram') && (
        <div className="fixed bottom-6 right-6 z-50">
          <button className="w-14 h-14 rounded-full bg-red-500 shadow-lg flex items-center justify-center relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-red-500 text-xs font-semibold flex items-center justify-center border-2 border-red-500">
              1
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;

