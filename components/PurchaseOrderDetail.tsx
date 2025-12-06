import React from 'react';
import { ChevronLeft, MoreVertical, Target, Copy, Check } from 'lucide-react';
import StatusBar from './StatusBar';

interface PurchaseOrderDetailProps {
  onBack: () => void;
  orderId?: string;
  appVersion?: number;
  onVersionChange?: (version: number) => void;
  onAdminClick?: () => void;
}

interface OrderDetailData {
  orderNumber: string;
  status: string;
  phone: string;
  address: string;
  deliveryType: string;
  deliveryTime: string;
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
    quantity: number;
  }[];
  priceSummary: {
    totalProductPrice: number;
    shippingFee: string;
    merchantDiscount: string;
    merchantPromotion: number;
    totalAmount: number;
  };
  orderInfo: {
    vehicleInfo: string;
    vin: string;
    paymentMethod: string;
    paymentStatus: string;
    needInvoice: string;
    orderNotes: string;
    orderTime: string;
    paymentTime: string;
    shippingTime: string;
    completionTime: string;
  };
}

const PurchaseOrderDetail: React.FC<PurchaseOrderDetailProps> = ({ onBack, orderId, appVersion, onVersionChange, onAdminClick }) => {
  // 模拟订单数据，实际应该根据orderId从props或状态中获取
  const orderData: OrderDetailData = {
    orderNumber: 'S2511130025400',
    status: '已完成',
    phone: '115888888888',
    address: '浙江省杭州市余杭区文一西路1218号余杭区海创科技中心3幢(龙潭路南)',
    deliveryType: '马上送',
    deliveryTime: '预计30分钟送达',
    products: [
      {
        id: '1',
        name: '劲豹 80103040 蓄电池 6-QW-75min(480)/L2-400',
        image: 'https://images.unsplash.com/photo-1609630985558-86d4e8c18731?w=150&h=150&fit=crop&q=80',
        price: '¥--',
        quantity: 1,
      },
    ],
    priceSummary: {
      totalProductPrice: 1185.00,
      shippingFee: '线下结算',
      merchantDiscount: '',
      merchantPromotion: 23.70,
      totalAmount: 1161.30,
    },
    orderInfo: {
      vehicleInfo: '宝马 325Li 2020 2.0T 手自一体',
      vin: 'LBV6P4103LMY29988',
      paymentMethod: '银联商务支付宝(小程序)支付',
      paymentStatus: '已付款',
      needInvoice: '否',
      orderNotes: '不用放单,顺丰快递',
      orderTime: '2025-11-13 16:52:05',
      paymentTime: '2025-11-13 16:52:18',
      shippingTime: '2025-11-13 18:09:57',
      completionTime: '2025-11-24 00:43:50',
    },
  };

  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderData.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar variant="white" appVersion={appVersion} onVersionChange={onVersionChange} onAdminClick={onAdminClick} />
      {/* Header */}
      <div className="bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <button onClick={onBack} className="p-1 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">订单详情</h1>
          <div className="flex items-center gap-2">
            <button className="p-1">
              <MoreVertical className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-1">
              <Target className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Order Status */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{orderData.status}</div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white mx-4 mt-3 rounded-xl p-4 shadow-sm">
          <div className="text-base font-medium text-gray-900 mb-2">{orderData.phone}</div>
          <div className="text-sm text-gray-600 mb-3">{orderData.address}</div>
          <div className="border-t border-gray-100 pt-3">
            <div className="text-sm font-medium text-gray-900 mb-1">{orderData.deliveryType}</div>
            <div className="text-xs text-gray-500">{orderData.deliveryTime}</div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white mx-4 mt-3 rounded-xl p-4 shadow-sm">
          {orderData.products.map((product) => (
            <div key={product.id} className="flex items-start gap-3">
              <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                <span className="text-xs text-gray-600 font-medium text-center px-2 line-clamp-3 leading-tight">
                  {product.name.length > 12 ? product.name.substring(0, 12) + '...' : product.name}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">{product.price}</span>
                  <span className="text-sm text-gray-500">x{product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="bg-white mx-4 mt-3 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">商品总价</span>
            <span className="text-sm text-gray-900">¥{orderData.priceSummary.totalProductPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">合计运费</span>
            <span className="text-sm text-gray-900">{orderData.priceSummary.shippingFee}</span>
          </div>
          {orderData.priceSummary.merchantDiscount && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">商家优惠</span>
              <span className="text-sm text-gray-900">{orderData.priceSummary.merchantDiscount}</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">商家促销</span>
            <span className="text-sm text-red-600">-¥{orderData.priceSummary.merchantPromotion.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900">应付总额</span>
            <span className="text-lg font-bold text-red-600">¥{orderData.priceSummary.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-white mx-4 mt-3 rounded-xl p-4 shadow-sm mb-4">
          <div className="text-base font-semibold text-gray-900 mb-3">订单信息</div>
          
          <div className="mb-3">
            <span className="text-sm text-gray-600">订单编号:</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-900">{orderData.orderNumber}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 border border-red-600 rounded"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    复制
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">车型信息:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.vehicleInfo}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">VIN码:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.vin}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">支付方式:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.paymentMethod}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">付款状态:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.paymentStatus}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">是否需要发票:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.needInvoice}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">订单备注:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.orderNotes}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">下单时间:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.orderTime}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">支付时间:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.paymentTime}</div>
          </div>

          <div className="mb-3">
            <span className="text-sm text-gray-600">发货时间:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.shippingTime}</div>
          </div>

          <div>
            <span className="text-sm text-gray-600">完成时间:</span>
            <div className="text-sm text-gray-900 mt-1">{orderData.orderInfo.completionTime}</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-20 pb-safe">
        <div className="flex items-center gap-3">
          <button className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-lg text-sm font-medium">
            帮我换货
          </button>
          <button className="flex-1 bg-white text-gray-900 border border-gray-300 py-2.5 rounded-lg text-sm font-medium">
            申请售后
          </button>
          <button className="flex-1 bg-white text-gray-900 border border-gray-300 py-2.5 rounded-lg text-sm font-medium">
            物流跟踪
          </button>
          <button className="flex-1 bg-white text-red-600 border border-red-600 py-2.5 rounded-lg text-sm font-medium">
            评价
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;

