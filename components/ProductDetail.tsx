import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, ShoppingCart } from 'lucide-react';

interface ProductDetailProps {
  onBack: () => void;
  productId?: string;
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

const ProductDetail: React.FC<ProductDetailProps> = ({ onBack, productId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  // Mock product data
  const product = {
    id: productId || '1',
    images: [
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    ],
    price: 345,
    name: '巨江启停蓄电池 6-QTPA-80(720) EFB-T115',
    purchaseInfo: '按1倍加购 | 库存90',
    brand: '巨江',
    productInfo: {
      materialCode: '80102949',
      brand: '巨江',
      specification: 'EFB-T115',
      originalCode: '6-QTPA-80(720)',
      generalSpec: 'EFB-T115',
      nationalSpec: '6-QTPE-75',
      polarity: 'L',
      capacity: '80',
      startingCurrent: '720',
      length: '305',
      width: '172',
      height: '203',
    },
    applicableModels: [
      {
        brand: '雷克萨斯',
        model: 'ES(丰田汽车)',
        parentBrand: 'ES',
        years: [
          { year: '2015款', engine: '2.0L' },
          { year: '2016款', engine: '2.0L' },
          { year: '2017款', engine: '2.0L' },
        ],
      },
      {
        brand: '雷克萨斯',
        model: 'RX(丰田汽车)',
        parentBrand: 'RX',
        years: [
          { year: '2016款', engine: '2.0T' },
          { year: '2017款', engine: '2.0T' },
          { year: '2020款', engine: '2.0T' },
          { year: '2021款', engine: '2.0T' },
        ],
      },
    ] as CarModel[],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center px-4 pt-3 pb-2">
          <button onClick={onBack} className="p-1 -ml-1 mr-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900">商品详情</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Product Image Carousel */}
        <div className="relative bg-white">
          <div className="relative h-80 bg-gray-100">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
                
                {/* Image Indicator */}
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-xs text-white/80">
                  {currentImageIndex + 1}/{product.images.length}
                </div>
              </>
            )}

            {/* Brand Logo */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
              <div className="w-6 h-6 bg-secondary rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">E</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.brand}</span>
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">适用车型</h3>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-3 py-1 text-sm text-secondary border border-secondary rounded-lg"
            >
              <Filter className="w-4 h-4 inline mr-1" />
              筛选
            </button>
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

