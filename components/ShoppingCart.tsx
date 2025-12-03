import React, { useState } from 'react';
import { ChevronLeft, MoreVertical, ChevronDown, ChevronUp, Smile, AlertCircle, Shield, Wrench } from 'lucide-react';

interface ShoppingCartProps {
  onBack: () => void;
}

interface CartItem {
  id: string;
  storeName: string;
  storeLocation: string;
  cutOffTimes: string[];
  productId: string;
  productName: string;
  productImage: string;
  brandPartNumber: string;
  originalPartNumber: string;
  brandPart: string;
  location: string;
  price: number;
  quantity: number;
  selected: boolean;
  returnPolicy?: string;
  guarantees?: string[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ onBack }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      storeName: '快准车服',
      storeLocation: '临安服务站',
      cutOffTimes: ['上午11:30', '下午14:30', '下午18:00'],
      productId: 'p1',
      productName: '潘东兴 福斯 CHF11S 方向机助...',
      productImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=200&q=80',
      brandPartNumber: 'CHF11S',
      originalPartNumber: 'LR003401',
      brandPart: '品牌件:潘东兴',
      location: '广州',
      price: 77.00,
      quantity: 1,
      selected: true,
      returnPolicy: '7天无理由退货',
      guarantees: ['赔', '技'],
    },
  ]);

  const [selectAll, setSelectAll] = useState(true);
  const [showDiscountDetail, setShowDiscountDetail] = useState(false);

  const toggleItemSelect = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(items =>
      items.map(item => ({ ...item, selected: newSelectAll }))
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0.00;
  const finalTotal = totalPrice - discount;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center px-4 pt-3 pb-2">
          <button onClick={onBack} className="p-1 -ml-1 mr-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900">购物车</h1>
          <button className="p-1 -mr-1 ml-2">
            <MoreVertical className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto pb-24">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white mt-2 mx-2 rounded-lg p-4 mb-2">
            {/* Store Info */}
            <div className="flex items-center gap-2 mb-2">
              <Smile className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                {item.storeName} ({item.storeLocation})
              </span>
            </div>

            {/* Cut-off Time */}
            <div className="flex items-center gap-1 mb-3 text-xs text-red-600">
              <AlertCircle className="w-3 h-3" />
              <span>商家截单时间: {item.cutOffTimes.join(' ')}</span>
            </div>

            {/* Product Item */}
            <div className="flex gap-3">
              {/* Checkbox */}
              <button
                onClick={() => toggleItemSelect(item.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  item.selected
                    ? 'bg-red-500 border-red-500'
                    : 'border-gray-300'
                }`}
              >
                {item.selected && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Product Image */}
              <div className="flex gap-2 flex-1">
                <div className="flex gap-1 flex-shrink-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 object-contain bg-gray-50 rounded"
                  />
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 object-contain bg-gray-50 rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                    {item.productName}
                  </h3>
                  
                  <div className="space-y-1 mb-2">
                    <div className="text-xs text-gray-600">
                      品牌件编号:{item.brandPartNumber}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600">
                        原厂零件号:{item.originalPartNumber}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {item.brandPart}
                      </span>
                      <span className="text-xs text-gray-500">{item.location}</span>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-semibold text-red-500">
                      ¥{item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600"
                      >
                        <span className="text-sm">-</span>
                      </button>
                      <span className="w-8 text-center text-sm text-gray-900 bg-gray-50 rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600"
                      >
                        <span className="text-sm">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Service Guarantees */}
                  <div className="flex items-center gap-2 mt-2">
                    {item.returnPolicy && (
                      <span className="text-xs text-red-500 border border-red-500 px-2 py-0.5 rounded">
                        {item.returnPolicy}
                      </span>
                    )}
                    {item.guarantees?.map((guarantee, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-xs text-blue-600"
                      >
                        <Shield className="w-3 h-3" />
                        <span>{guarantee}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-50 border-t border-gray-200 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          {/* Select All */}
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectAll
                  ? 'bg-red-500 border-red-500'
                  : 'border-gray-300'
              }`}
            >
              {selectAll && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-900">全选</span>
          </button>

          {/* Price Info */}
          <div className="flex-1 flex flex-col items-end">
            <button
              onClick={() => setShowDiscountDetail(!showDiscountDetail)}
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <span>立减:¥{discount.toFixed(2)} 优惠明细</span>
              {showDiscountDetail ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            <div className="text-sm text-gray-900">
              合计:<span className="text-red-500 font-semibold ml-1">¥{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="bg-red-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap">
            结算 ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

