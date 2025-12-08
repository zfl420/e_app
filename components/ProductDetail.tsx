import React, { useMemo } from 'react';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { CATEGORY_PRODUCT_MAP } from '../constants';
import { ProductItem } from '../types';
import StatusBar from './StatusBar';

interface ProductDetailProps {
  onBack: () => void;
  productId?: string;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

interface CarModel {
  brand: string;
  model: string;
  parentBrand?: string;
  years: Array<{
    year: string;
    engine: string;
  }>;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onBack, productId, appVersion, onVersionChange, onAdminClick }) => {

  // 从所有分类的商品中查找对应的商品
  const productItem = useMemo(() => {
    if (!productId) return null;
    
    // 遍历所有分类查找商品
    for (const categoryProducts of Object.values(CATEGORY_PRODUCT_MAP)) {
      const found = categoryProducts.find(item => item.id === productId);
      if (found) return found;
    }
    return null;
  }, [productId]);

  // 将 ProductItem 转换为组件需要的格式
  const product = useMemo(() => {
    if (!productItem) {
      // 默认数据（当找不到商品时）
      return {
        id: productId || '1',
        images: [
          'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa3?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1607868578181-8b3b2c8e3caa?auto=format&fit=crop&w=1200&q=80',
        ],
        price: 0,
        name: '商品不存在',
        purchaseInfo: '--',
        brand: '--',
        productInfo: {
          materialCode: '--',
          brand: '--',
          specification: '--',
          originalCode: '--',
          generalSpec: '--',
          nationalSpec: '--',
          polarity: '--',
          capacity: '--',
          startingCurrent: '--',
          length: '--',
          width: '--',
          height: '--',
        },
        applicableModels: [] as CarModel[],
      };
    }

    // 根据商品ID生成虚拟的产品信息
    const generateProductInfo = (item: ProductItem) => {
      // 使用商品ID的哈希值生成稳定的虚拟数据
      const hash = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      // 从规格中提取信息，如果没有则使用虚拟数据
      const specs = item.specs || item.volume || '';
      const brand = item.brand || item.title.split(' ')[0] || '未知品牌';
      
      return {
        materialCode: `MAT${String(hash).padStart(8, '0')}`,
        brand: brand,
        specification: specs || '标准规格',
        originalCode: `OE${String(hash).padStart(8, '0')}`,
        generalSpec: specs || '通用规格',
        nationalSpec: `GB${String(hash % 10000).padStart(4, '0')}`,
        polarity: hash % 2 === 0 ? 'L' : 'R',
        capacity: item.attributes?.capacity || String(60 + (hash % 40)),
        startingCurrent: item.attributes?.voltage ? String(500 + (hash % 500)) : '--',
        length: String(200 + (hash % 200)),
        width: String(150 + (hash % 100)),
        height: String(100 + (hash % 150)),
      };
    };

    // 将适用车型转换为 CarModel 格式
    const convertApplicableModels = (models?: string[]): CarModel[] => {
      if (!models || models.length === 0) {
        // 如果没有适用车型，生成虚拟数据
        const hash = productItem.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const brands = ['大众', '丰田', '本田', '奔驰', '宝马', '奥迪'];
        const brand = brands[hash % brands.length];
        return [
          {
            brand: brand,
            model: `${brand} 通用车型`,
            parentBrand: brand,
            years: [
              { year: '2020款', engine: '2.0L' },
              { year: '2021款', engine: '2.0L' },
              { year: '2022款', engine: '2.0T' },
            ],
          },
        ];
      }

      // 将字符串数组转换为 CarModel 格式
      return models.map((model, index) => {
        const hash = (productItem.id + index).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return {
          brand: model,
          model: `${model} 系列`,
          parentBrand: model,
          years: [
            { year: '2020款', engine: '2.0L' },
            { year: '2021款', engine: '2.0L' },
            { year: '2022款', engine: '2.0T' },
          ],
        };
      });
    };

    return {
      id: productItem.id,
      images: [
        productItem.image || 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa3?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1607868578181-8b3b2c8e3caa?auto=format&fit=crop&w=1200&q=80',
      ],
      price: parseFloat(productItem.price) || 0,
      name: productItem.title,
      purchaseInfo: `按1倍加购 | 库存${90 + (productItem.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 50)}`,
      brand: productItem.brand || productItem.title.split(' ')[0] || '未知品牌',
      productInfo: generateProductInfo(productItem),
      applicableModels: convertApplicableModels(productItem.applicableModels),
    };
  }, [productItem, productId]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900">商品详情</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Product Image Carousel */}
        <div className="relative bg-white">
          <div className="relative h-80 bg-gray-100 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="text-xl font-semibold text-gray-400 mb-2">
                商品示意区域
              </div>
              <div className="text-sm text-gray-500">
                灰色背景 + 文案占位，可根据实际需求替换为实物图片
              </div>
            </div>
          </div>
        </div>

        {/* Price and Basic Info */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-red-500">¥ {product.price}</span>
          </div>
          <h2 className="text-base font-medium text-gray-900 mb-2 leading-tight">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600">{product.purchaseInfo}</p>
        </div>

        {/* Product Information */}
        <div className="bg-white mt-2 px-4 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-3">产品信息</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">物料编码</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.materialCode}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">品牌</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.brand}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">规格</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.specification}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">原厂产品码</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.originalCode}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">通用规格</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.generalSpec}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">国标规格</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.nationalSpec}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">极性</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.polarity}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">容量 (Ah)</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.capacity}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">启动电流 (A)</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.startingCurrent}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">长度 (mm)</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.length}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">宽度 (mm)</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.width}</span>
            </div>
            <div className="flex items-start">
              <span className="text-sm text-gray-600 w-24 flex-shrink-0">高度 (mm)</span>
              <span className="text-sm text-gray-900 flex-1">{product.productInfo.height}</span>
            </div>
          </div>
        </div>

        {/* Applicable Car Models */}
        <div className="bg-white mt-2 px-4 py-4">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-gray-900">适用车型</h3>
          </div>
          
          <div className="space-y-4">
            {product.applicableModels.map((carModel, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">{carModel.brand}</span>
                  <span className="text-sm text-gray-600">{carModel.model}</span>
                  {carModel.parentBrand && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {carModel.parentBrand}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {carModel.years.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded"
                    >
                      {item.year} {item.engine}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-20"></div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-2 safe-area-bottom">
        <button className="px-3 py-2 text-sm text-gray-700 flex-shrink-0">店铺</button>
        <button className="px-3 py-2 text-sm text-gray-700 flex-shrink-0">联系商家</button>
        <button className="flex-1 px-4 py-2.5 bg-secondary/10 text-secondary rounded-lg text-sm font-medium">
          <ShoppingCart className="w-4 h-4 inline mr-1" />
          加入购物车
        </button>
        <button className="flex-1 px-4 py-2.5 bg-secondary text-white rounded-lg text-sm font-medium">
          立即购买
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

