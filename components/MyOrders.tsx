import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Store, Smile, ChevronRight } from 'lucide-react';

export type OrderTab = 'all' | 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'refund';

interface OrderItem {
  id: string;
  storeName: string;
  status: 'cancelled' | 'completed' | 'pending_pay' | 'pending_ship' | 'pending_receive' | 'pending_review' | 'refund';
  itemDescription: string;
  orderNumber: string;
  vehicleInfo?: string;
  vin?: string;
  quantity: number;
  price: number;
  customer: string;
  date: string;
}

interface MyOrdersProps {
  onBack: () => void;
  initialTab?: OrderTab;
  onOrderClick?: (orderId: string) => void;
}

const MyOrders: React.FC<MyOrdersProps> = ({ onBack, initialTab = 'all', onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<OrderTab>(initialTab);

  // 生成订单数据，确保每个TAB都有数据，80%门店名称为"快准车服（临安服务站）"
  const generateMockOrders = (): OrderItem[] => {
    const storeNames = [
      '快准车服（临安服务站）',
      '快准车服（临安服务站）',
      '快准车服（临安服务站）',
      '快准车服（临安服务站）',
      '快准车服（临安服务站）',
      '快准车服（临安服务站）',
      '快准车服（临安服务站）',
      '快准车服（临安服务站）', // 8个，80%
      '上海联合汽配', // 1个，10%
      '博世汽车配件旗舰店', // 1个，10%
    ];

    const baseOrders: OrderItem[] = [
      {
        id: '1',
        storeName: storeNames[0],
        status: 'cancelled',
        itemDescription: '① 曼牌 空调格 空调格带碳',
        orderNumber: 'S2511190002564',
        quantity: 1,
        price: 33.90,
        customer: '邹飞龙',
        date: '11-19',
      },
      {
        id: '2',
        storeName: storeNames[1],
        status: 'cancelled',
        itemDescription: '马牌 225/45R18 95W XL ContiSportContact...',
        orderNumber: 'S2511190003131',
        vehicleInfo: '奔驰 C 260 Tourer 48V 2018 1.5T 手自一体',
        vin: 'WDDWH7HB6XF883297',
        quantity: 1,
        price: 960.00,
        customer: '邹飞龙',
        date: '11-19',
      },
      {
        id: '3',
        storeName: storeNames[2],
        status: 'completed',
        itemDescription: '劲豹 80103040 蓄电池 6-QW-75min(480)/L2-400',
        orderNumber: 'S2511130025400',
        vehicleInfo: '宝马 325Li 2020 2.0T 手自一体',
        vin: 'LBV6P4103LMY29988',
        quantity: 1,
        price: 1161.30,
        customer: '邹飞龙',
        date: '11-13',
      },
      {
        id: '4',
        storeName: storeNames[3],
        status: 'pending_pay',
        itemDescription: '博世 刹车片前片',
        orderNumber: 'S2511200001234',
        vehicleInfo: '大众 朗逸 2020 1.5L 手自一体',
        quantity: 1,
        price: 268.00,
        customer: '邹飞龙',
        date: '11-20',
      },
      {
        id: '5',
        storeName: storeNames[4],
        status: 'pending_ship',
        itemDescription: '美孚1号 金装 0W-40 全合成机油',
        orderNumber: 'S2511210005678',
        quantity: 4,
        price: 270.00,
        customer: '邹飞龙',
        date: '11-21',
      },
      {
        id: '6',
        storeName: storeNames[5],
        status: 'pending_receive',
        itemDescription: '瓦尔塔 蓄电池 55B24L 12V 45Ah',
        orderNumber: 'S2511220001234',
        vehicleInfo: '丰田 凯美瑞 2021 2.5L 手自一体',
        vin: 'LVSHCAMB1ME012345',
        quantity: 1,
        price: 398.00,
        customer: '邹飞龙',
        date: '11-22',
      },
      {
        id: '7',
        storeName: storeNames[6],
        status: 'pending_review',
        itemDescription: '菲罗多 刹车片 前片',
        orderNumber: 'S2511230005678',
        vehicleInfo: '本田 雅阁 2019 1.5T 无级',
        quantity: 1,
        price: 268.00,
        customer: '邹飞龙',
        date: '11-23',
      },
      {
        id: '8',
        storeName: storeNames[7],
        status: 'refund',
        itemDescription: 'TRW 刹车盘 前轮盘',
        orderNumber: 'S2511240001234',
        vehicleInfo: '奥迪 A4L 2020 2.0T 手自一体',
        vin: 'LFV3A28K0L3123456',
        quantity: 2,
        price: 640.00,
        customer: '邹飞龙',
        date: '11-24',
      },
      {
        id: '9',
        storeName: storeNames[8],
        status: 'completed',
        itemDescription: '水泵总成',
        orderNumber: 'S2511250005678',
        vehicleInfo: '日产 轩逸 2021 1.6L 无级',
        quantity: 1,
        price: 450.00,
        customer: '邹飞龙',
        date: '11-25',
      },
      {
        id: '10',
        storeName: storeNames[9],
        status: 'pending_pay',
        itemDescription: '嘉实多 极护 钛流体 0W-20 SP 1L',
        orderNumber: 'S2511260001234',
        quantity: 4,
        price: 178.72,
        customer: '邹飞龙',
        date: '11-26',
      },
    ];

    return baseOrders;
  };

  const mockOrders = generateMockOrders();

  const tabs: { id: OrderTab; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'pending_pay', label: '待付款' },
    { id: 'pending_ship', label: '待发货' },
    { id: 'pending_receive', label: '待收货' },
    { id: 'pending_review', label: '待评价' },
    { id: 'refund', label: '退款/售后' },
  ];

  const getStatusText = (status: OrderItem['status']): string => {
    const statusMap: Record<string, string> = {
      cancelled: '已取消',
      completed: '已完成',
      pending_pay: '待付款',
      pending_ship: '待发货',
      pending_receive: '待收货',
      pending_review: '待评价',
      refund: '退款/售后',
    };
    return statusMap[status] || status;
  };

  const getFilteredOrders = (): OrderItem[] => {
    if (activeTab === 'all') {
      return mockOrders;
    }
    return mockOrders.filter(order => {
      if (activeTab === 'pending_pay') return order.status === 'pending_pay';
      if (activeTab === 'pending_ship') return order.status === 'pending_ship';
      if (activeTab === 'pending_receive') return order.status === 'pending_receive';
      if (activeTab === 'pending_review') return order.status === 'pending_review';
      if (activeTab === 'refund') return order.status === 'refund';
      return true;
    });
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const filteredOrders = getFilteredOrders();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Status Bar Placeholder */}
      <div className="h-0 bg-white"></div>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900">我的订单</h1>
          <div className="flex items-center gap-3">
            <button className="p-2">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2">
              <Filter className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-gray-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium relative transition-colors ${
                activeTab === tab.id
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto pb-safe-bottom">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-sm">暂无订单</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white px-4 py-4 cursor-pointer active:bg-gray-50 transition-colors"
                onClick={() => onOrderClick?.(order.id)}
              >
                {/* Store Name and Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{order.storeName}</span>
                    <Smile className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className={`text-sm ${
                    order.status === 'cancelled' ? 'text-gray-500' :
                    order.status === 'completed' ? 'text-gray-700' :
                    'text-red-600'
                  }`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Item Description */}
                <div className="mb-2">
                  <p className="text-sm text-gray-900">{order.itemDescription}</p>
                </div>

                {/* Order Number */}
                <div className="mb-2">
                  <p className="text-xs text-gray-500">{order.orderNumber}</p>
                </div>

                {/* Vehicle Info */}
                {order.vehicleInfo && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-600">{order.vehicleInfo}</p>
                  </div>
                )}

                {/* VIN */}
                {order.vin && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500">{order.vin}</p>
                  </div>
                )}

                {/* Price and Customer Info */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      共{order.quantity}件,实付:¥{order.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.customer} {order.date}
                  </div>
                </div>

                {/* Action Button */}
                {order.status === 'cancelled' && (
                  <div className="flex justify-end mt-3">
                    <button className="px-4 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                      再次购买
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

