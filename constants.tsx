import { 
  ScanLine, ShoppingCart, CircleDollarSign, Store, FileText, Package, 
  FileSignature, Car, ClipboardList, Share2, 
  Droplets, Battery, Disc, CircleDot, Database, Filter, Gauge, LayoutGrid,
  Home, MessageCircle, Plus, FileQuestion, User,
  Wallet, Truck, Gift, MessageSquareText, RotateCcw,
  UserCog, Wrench, Clock, Users, Bot, Sparkles, Calculator, Grid3x3
} from 'lucide-react';
import { MenuItem, TaskItem, NavItem, VideoItem, ChatThread, Contact, ChatMessage, InquiryItem, ArrivalItem, ProductItem, CustomerItem, VehicleItem, WorkOrderItem } from './types';

export const TOP_ACTIONS: MenuItem[] = [
  { id: 'price', label: '查4S价', icon: Store },
  { id: 'maintain', label: '查保养', icon: Wrench },
  { id: 'catalog', label: '电子目录', icon: FileText },
  { id: 'inventory', label: '库存查询', icon: Package },
];

export const MANAGEMENT_ACTIONS: MenuItem[] = [
  { id: 'bill', label: '接车开单', icon: FileSignature, color: 'text-gray-900' },
  { id: 'workorders', label: '工单列表', icon: ClipboardList, color: 'text-gray-900' },
  { id: 'vehicle_manage', label: '车辆管理', icon: Car, color: 'text-gray-900' },
  { id: 'customer_manage', label: '客户管理', icon: Users, color: 'text-gray-900' },
  { id: 'fast_pay', label: '快捷收款', icon: CircleDollarSign, color: 'text-gray-900' },
  { id: 'manual', label: '维修手册', icon: Wrench, color: 'text-gray-900' },
  { id: 'reports', label: '查报表', icon: FileText, color: 'text-gray-900' },
  { id: 'marketing', label: '做营销', icon: Share2, color: 'text-gray-900' },
];

export const RECENT_TASKS: TaskItem[] = [
  { id: '1', plate: '浙A 888888', status: 'pending_pay', serviceType: '常规保养', isUrgent: true },
  { id: '2', plate: '皖C 777777', status: 'pending_work', serviceType: '标准洗车' },
];

export const CATEGORIES: MenuItem[] = [
  { id: 'oil', label: '汽机油', icon: Droplets },
  { id: 'battery', label: '蓄电池', icon: Battery },
  { id: 'brake_pad', label: '刹车片', icon: Disc },
  { id: 'brake_disc', label: '刹车盘', icon: CircleDot },
  { id: 'chassis', label: '底盘', icon: Database },
  { id: 'filter', label: '过滤', icon: Filter },
  { id: 'sensor', label: '胎压传感器', icon: Gauge },
  { id: 'all', label: '全部分类', icon: LayoutGrid },
];

export const VIDEO_FEED: VideoItem[] = [
  { 
    id: '1',
    title: '更换机油 别踩坑！',
    author: '快准车服官方',
    // 静态物料图 1（请将图片放在 public/feeds/feed1.jpg）
    imageUrl: '/feeds/feed1.png'
  },
  { 
    id: '2',
    title: '换刹车片怕被忽悠？', 
    author: '快准车服官方', 
    // 静态物料图 2
    imageUrl: '/feeds/feed2.png'
  },
  { 
    id: '3',
    title: '轮胎鼓包/裂纹 千万别“凑合”', 
    author: '快准车服官方', 
    // 静态物料图 3
    imageUrl: '/feeds/feed3.png'
  },
  { 
    id: '4',
    title: '花纹磨平？立即换新！', 
    author: '快准车服官方', 
    // 静态物料图 4
    imageUrl: '/feeds/feed4.png'
  },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'chat', label: '沟通', icon: MessageCircle },
  { id: 'ai_quote', label: 'AI报价', icon: Bot, isPrimary: true },
  { id: 'inquiry', label: '询价单', icon: FileQuestion },
  { id: 'profile', label: '我的', icon: User },
];

// --- Parts List Data ---

export const SIDEBAR_CATEGORIES = [
  '汽车油品', '供电系统', '车轮系统', '过滤系统', '制动系统', '正时系统', '底盘系统', '热管理系统', '电子电器', '启发点火', '化工养护', '车身配件', '工具设备', '周边产品', '发动机系统'
];

interface CategoryData {
  subcategories: { name: string; img: string }[];
  brands: { name: string; code: string }[];
}

const GENERIC_SUBCATEGORIES = [
  { name: '通用配件', img: 'https://images.unsplash.com/photo-1486262715619-01b80258e0a5?w=150&h=150&fit=crop&q=80' },
  { name: '专业工具', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop&q=80' },
  { name: '清洗剂', img: 'https://images.unsplash.com/photo-1626127027471-7eb9277d3394?w=150&h=150&fit=crop&q=80' },
];

const GENERIC_BRANDS = [
  { name: '博世', code: 'BOSCH' },
  { name: '马勒', code: 'MAHLE' },
  { name: '曼牌', code: 'MANN' },
  { name: 'NGK', code: 'NGK' },
  { name: '布雷博', code: 'brembo' },
  { name: 'TRW', code: 'TRW' },
];

export const CATEGORY_SECTIONS: Record<string, CategoryData> = {
  '汽车油品': {
    subcategories: [
      { name: '汽机油', img: '' },
      { name: '柴机油', img: '' },
      { name: '自动变速箱油', img: '' },
      { name: '齿轮油', img: '' },
      { name: '助力油', img: '' },
      { name: '减速器油', img: '' },
      { name: '清洗油', img: '' },
      { name: '润滑脂', img: '' },
      { name: '液压油', img: '' },
    ],
    brands: [
      { name: '0769滤清器', code: '0769' },
      { name: '1942', code: '1942' },
      { name: 'KLG', code: 'KLG' },
      { name: '0769', code: '0769' },
      { name: '1942', code: '1942' },
      { name: 'KLG_', code: 'KLG' },
      { name: '555', code: '555' },
      { name: 'AC 德科', code: 'ACDelco' },
      { name: '爱驰易', code: 'Aicheyi' },
      { name: '爱信', code: 'AISIN' },
      { name: '安索', code: 'AMSOIL' },
      { name: '安赛途', code: 'Ansetu' },
      { name: 'Ate', code: 'Ate' },
      { name: 'Audi', code: 'Audi' },
      { name: 'AUI车养护', code: 'AUI' },
    ]
  },
  '供电系统': {
    subcategories: [
      { name: '启停蓄电池', img: '' },
      { name: '免维护蓄电池', img: '' },
      { name: '辅助电池', img: '' },
      { name: '电瓶底座', img: '' },
    ],
    brands: [
        { name: '瓦尔塔', code: 'VARTA' },
        { name: '骆驼', code: 'Camel' },
        { name: '风帆', code: 'Sail' },
    ]
  },
  '车轮系统': {
      subcategories: [
          { name: '乘用车轮胎', img: '' },
      ],
      brands: [
          { name: '米其林', code: 'Michelin' },
          { name: '普利司通', code: 'Bridge' },
          { name: '固特异', code: 'Goodyear' },
          { name: '马牌', code: 'Continental' },
      ]
  },
  '过滤系统': {
    subcategories: [
      { name: '机油滤清器', img: '' },
      { name: '燃油滤清器', img: '' },
      { name: '变速箱滤清器', img: '' },
      { name: '空气滤清器', img: '' },
      { name: '空调滤清器', img: '' },
      { name: '波箱滤网盖', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '制动系统': {
    subcategories: [
      { name: '前刹车片', img: '' },
      { name: '后刹车片', img: '' },
      { name: '前刹车盘', img: '' },
      { name: '后刹车盘', img: '' },
      { name: '报警线', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '正时系统': {
    subcategories: [
      { name: '正时皮带', img: '' },
      { name: '正时惰轮', img: '' },
      { name: '正时张紧轮', img: '' },
      { name: '正时皮带套包', img: '' },
      { name: '正时水泵套包', img: '' },
      { name: '正时盖板', img: '' },
      { name: '正时链条张紧器', img: '' },
      { name: '附件皮带', img: '' },
      { name: '附件惰轮', img: '' },
      { name: '附件张紧轮', img: '' },
      { name: '附件系统维修套装', img: '' },
      { name: '正时含水套装', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '底盘系统': {
    subcategories: [
      { name: '控制臂', img: '' },
      { name: '内拉杆', img: '' },
      { name: '平衡杆', img: '' },
      { name: '外球头', img: '' },
      { name: '悬挂球头', img: '' },
      { name: '开口胶', img: '' },
      { name: '侧拉杆总成', img: '' },
      { name: '悬挂系统附件', img: '' },
      { name: '摆臂胶套', img: '' },
      { name: '顶胶', img: '' },
      { name: '缓冲块+防尘罩', img: '' },
      { name: '减振器', img: '' },
      { name: '配件', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '热管理系统': {
    subcategories: [
      { name: '散热器', img: '' },
      { name: '水泵', img: '' },
      { name: '密封垫', img: '' },
      { name: '变速箱油管', img: '' },
      { name: '水箱盖', img: '' },
      { name: '暖风水箱', img: '' },
      { name: '干燥瓶', img: '' },
      { name: '空调管', img: '' },
      { name: '鼓风机电阻', img: '' },
      { name: '风扇继电器', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '电子电器': {
    subcategories: [
      { name: '卤素灯', img: '' },
      { name: '卤素升级灯', img: '' },
      { name: '白炽灯', img: '' },
      { name: 'LED灯', img: '' },
      { name: '氙气灯', img: '' },
      { name: '灯泡卡座', img: '' },
      { name: '解码器', img: '' },
      { name: '防尘罩', img: '' },
      { name: '通用喇叭', img: '' },
      { name: '专用喇叭', img: '' },
      { name: '喇叭转接线', img: '' },
      { name: '传感器', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '启发点火': {
    subcategories: [
      { name: '火花塞', img: '' },
      { name: '点火线圈', img: '' },
      { name: '高压线', img: '' },
      { name: '发电机', img: '' },
      { name: '启动机', img: '' },
      { name: '起动机电枢', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '化工养护': {
    subcategories: [
      { name: '化油器清洗剂', img: '' },
      { name: '多功能泡沫清洗剂', img: '' },
      { name: '表板蜡', img: '' },
      { name: '发动机外部清洗剂', img: '' },
      { name: '除锈剂', img: '' },
      { name: '柏油沥青清洗剂', img: '' },
      { name: '轮胎清洗剂', img: '' },
      { name: '黏胶去除剂', img: '' },
      { name: '其他清洗剂', img: '' },
      { name: '空调系统养护', img: '' },
      { name: '冷却系统养护', img: '' },
      { name: '发动机养护', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '车身配件': {
    subcategories: [
      { name: '前雨刮卡扣', img: '' },
      { name: '前雨刮片', img: '' },
      { name: '后雨刮片', img: '' },
      { name: '后雨刮卡扣', img: '' },
      { name: '升降器支架', img: '' },
      { name: '升降器电机', img: '' },
      { name: '升降器总成', img: '' },
      { name: '升降器开关', img: '' },
      { name: '紧固件', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '工具设备': {
    subcategories: [
      { name: '通用工具', img: '' },
      { name: '专用工具', img: '' },
      { name: '检测分析设备', img: '' },
      { name: '更换加注设备', img: '' },
      { name: '养护清洗设备', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '周边产品': {
    subcategories: [
      { name: '广宣品', img: '' },
      { name: '其他', img: '' },
    ],
    brands: GENERIC_BRANDS
  },
  '发动机系统': {
    subcategories: [
      { name: '燃油泵总成', img: '' },
      { name: '碳罐电磁阀', img: '' },
      { name: '燃油管', img: '' },
      { name: '空气进气管', img: '' },
      { name: '副空气泵', img: '' },
      { name: '凸轮轴调节器', img: '' },
    ],
    brands: GENERIC_BRANDS
  }
};

SIDEBAR_CATEGORIES.forEach(cat => {
    if (!CATEGORY_SECTIONS[cat]) {
        CATEGORY_SECTIONS[cat] = {
            subcategories: GENERIC_SUBCATEGORIES,
            brands: GENERIC_BRANDS
        };
    }
});

// --- Chat Data ---

export const CHAT_THREADS: ChatThread[] = [
  { id: 'sys', name: '系统通知', isSystem: true, type: 'system' },
  { id: 'ai_buy', name: '智能采购', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80', time: '11/27', lastMessage: '[图片]' },
  { id: 'guide', name: '开思导购', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&q=80', time: '11/19', lastMessage: '[询价单]' },
  { id: 'store1', name: '布雷博专卖店 (福建、新疆)', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80', time: '11/13', lastMessage: '没有' },
  { id: 'store2', name: '天津美实创新汽配', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&q=80', time: '11/13', lastMessage: '[商品]' },
  { id: 'store3', name: '开思严选专营店-东莞博辉', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80', time: '11/13', lastMessage: '[询价单]' },
  { id: 'store4', name: '开思严选专营店-广州博辉', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80', time: '11/13', lastMessage: '[询价单]' },
  { id: 'expert', name: '新能源技术专家', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80', time: '11/13', lastMessage: '您好，有什么新能源技术问题，都...' },
];

export const CONTACTS_DATA: Contact[] = [
  { id: 'c1', name: '张经理', role: '供应商', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80', company: '杭州汽配城' },
  { id: 'c2', name: '李师傅', role: '技术支持', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80', company: '博世服务中心' },
  { id: 'c3', name: '王小姐', role: '销售', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80', company: '美孚润滑油' },
];

export const SAMPLE_CHAT_HISTORY: ChatMessage[] = [
  { id: 'm1', text: '您好，请问这款刹车片有现货吗？', isMe: true, time: '10:30', type: 'text' },
  { id: 'm2', text: '有的，请问您需要什么车型的？', isMe: false, time: '10:31', type: 'text' },
  { id: 'm3', text: '2020款 奥迪A4L 40TFSI', isMe: true, time: '10:32', type: 'text' },
  { id: 'm4', text: '稍等，我帮您查一下库存', isMe: false, time: '10:32', type: 'text' },
  { id: 'm5', text: '已确认，仓库有货，今天下午可以发货。', isMe: false, time: '10:35', type: 'text' },
  { id: 'm6', text: '好的，麻烦帮我开个单', isMe: true, time: '10:36', type: 'text' },
  { id: 'm7', text: '[询价单]', isMe: true, time: '10:36', type: 'system' },
];

// --- Inquiry List Data ---

export const INQUIRY_LIST_DATA: InquiryItem[] = [
  {
    id: 'i1',
    brandName: 'Nissan',
    carModel: '日产 轩逸 2012 1.6 无级 XE 舒适版',
    vin: 'LGBH52E0XCY033143',
    status: 'quoted',
    parts: [
      { name: '水管三通', code: '19372102917(B251201137542)', date: '12/01' }
    ]
  },
  {
    id: 'i2',
    brandName: 'Benz',
    carModel: '奔驰 GLC 300 Coupe 4MATIC 2020 2.0T 手自一体',
    vin: 'W1N0J8EB4LF836975',
    status: 'expired',
    parts: [
      { name: '节温器', code: '19372102917(B25112066489)', date: '11/20' }
    ]
  },
  {
    id: 'i3',
    brandName: 'Peugeot',
    carModel: '标致 308 2016 1.6 手自一体 豪华版',
    vin: 'LDC983T43G1571126',
    status: 'expired',
    parts: [
      { name: '右机脚', code: '19372102917(B25112024505)', date: '11/20' }
    ]
  },
  {
    id: 'i4',
    brandName: 'Volkswagen',
    carModel: '大众 T-Cross(途铠) 2019 1.5 手自一体 舒适版',
    vin: 'LSVUB6C10K2053790',
    status: 'expired',
    showCart: true,
    parts: [
      { name: '发动机机脚胶', code: '19372102917(B25112012612)', date: '11/20' }
    ]
  }
];

// --- Profile Data ---

export const PROFILE_ORDERS = [
    { label: '待付款', icon: Wallet, badge: null },
    { label: '待发货', icon: Package, badge: null },
    { label: '待收货', icon: Truck, badge: null },
    { label: '待评价', icon: MessageSquareText, badge: 2 },
    { label: '退款/售后', icon: RotateCcw, badge: 2 },
];

export const PROFILE_MENU = [
    { label: '员工管理', icon: Users, color: 'bg-pink-50 text-pink-500' },
    { label: '门店管理', icon: Store, color: 'bg-orange-50 text-orange-500' },
    { label: '库存管理', icon: Car, color: 'bg-red-50 text-red-500' },
    { label: '配件管理', icon: Wrench, color: 'bg-blue-50 text-blue-500' },
    { label: '工时管理', icon: Clock, color: 'bg-purple-50 text-purple-500' },
];

export const PROFILE_STATS = [
    { label: '产值', value: '0.00' },
    { label: '实收', value: '0.00' },
    { label: '台次', value: '0' },
    { label: '客单价', value: '0.00' },
];

// --- Arrival List Data ---
export const ARRIVAL_LIST_DATA: ArrivalItem[] = [
    {
      id: 'a1',
      plate: '浙A00V5A',
      model: '奥迪 A4L',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png',
      status: 'working',
      subStatus: '维修',
      time: '在店3分钟',
      sa: '飞龙',
      tech: 'TK',
      tags: [
        { text: '已预检', color: 'text-green-600', icon: 'check' },
        { text: '问题x2', color: 'text-secondary', icon: 'alert' },
        { text: '检测中', color: 'text-orange-500', icon: 'dots' }
      ],
      workOrderSummary: '待施工x1',
      location: '天猫养车 (总部店-飞龙)'
    },
    {
      id: 'a2',
      plate: '粤B 12345',
      model: '宝马 5系 530Li',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
      status: 'pending',
      subStatus: '保养',
      time: '在店1小时',
      sa: '张三',
      tech: '李四',
      tags: [
        { text: '已预检', color: 'text-green-600', icon: 'check' }
      ],
      workOrderSummary: '待派工',
      location: '天猫养车 (总部店-飞龙)'
    },
    {
      id: 'a3',
      plate: '京N 88888',
      model: '奔驰 E300L',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png',
      status: 'finished',
      subStatus: '洗车',
      time: '在店2小时',
      sa: '王五',
      tech: '赵六',
      tags: [],
      workOrderSummary: '待结算',
      location: '天猫养车 (总部店-飞龙)'
    },
    // Generate more mock items
    ...Array.from({ length: 12 }).map((_, i) => ({
      id: `a${i + 4}`,
      plate: `苏E ${10000 + i}`,
      model: i % 2 === 0 ? '大众 迈腾' : '丰田 凯美瑞',
      brandLogo: i % 2 === 0 ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/1200px-Toyota.svg.png',
      status: 'received' as const,
      subStatus: '普洗',
      time: '在店10分钟',
      sa: '客服A',
      tech: '技师B',
      tags: [
         { text: '已接车', color: 'text-blue-500', icon: 'check' as const }
      ],
      workOrderSummary: '待检查',
      location: '天猫养车 (分店-城西)'
    }))
  ];

// --- Product List Data ---

export const OIL_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    title: '国行/大陆 美孚 美孚1号 金装 0W-40 全合成机油 1L 装 经典表现 成功挑战20,000公里换油周期',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/111308/34/21436/120094/621f4cf3E6b8c3b1c/b2f9d19c52c9e4b2.jpg',
    tags: ['0W-40', '全合成机油', '国行/大陆'],
    price: '67.50',
    priceNoTax: '60.00',
    promo: '秒杀',
    volume: '1L',
    sold: '月销 2,345',
    shop: '油好油品专营店',
    location: '广州白云仓',
  },
  {
    id: 'p2',
    title: '进口/马来西亚 嘉实多 极护 钛流体 0W-20 SP 1L 全合成机油 机油润滑油 24瓶/箱',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/163324/30/31259/164248/63fdc3bfEa5a1d752/4f38ebb9ba4c6ebe.jpg',
    tags: ['0W-20', '全合成机油', '进口/马来西亚'],
    price: '44.68',
    priceNoTax: '43.80',
    promo: '活动',
    volume: '1L',
    sold: '月销 1,023',
    shop: '联睿行商城旗舰店',
    location: '广州白云仓',
  },
  {
    id: 'p3',
    title: '进口/韩国 嘉实多 极护 5W-30 1L SN 全合成机油 新款包装 12瓶/箱 常规版',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/113783/30/24097/121595/621f4d3aE09fddfb1/4e3b725f0c1a72ed.jpg',
    tags: ['5W-30', '全合成机油', '进口/韩国'],
    price: '38.20',
    priceNoTax: '36.00',
    promo: '',
    volume: '1L',
    sold: '月销 856',
    shop: '联睿行商城旗舰店',
    location: '广州白云仓',
  },
];

export const BATTERY_PRODUCTS: ProductItem[] = [
  {
    id: 'b1',
    title: '瓦尔塔 蓄电池 汽车电瓶 55B24L 12V 45Ah 启停/非启停通用 以换代修',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/177113/20/24361/132657/624fd0b2Eca9e02c8/40d7c2f5a7d44b5c.jpg',
    tags: ['12V', '45Ah', '免维护'],
    price: '398.00',
    priceNoTax: '352.21',
    promo: '热销',
    volume: '1只',
    sold: '月销 1,586',
    shop: '瓦尔塔旗舰店',
    location: '华东仓',
  },
  {
    id: 'b2',
    title: '风帆 蓄电池 6-QW-60(550) 12V 60Ah 免维护 汽车电瓶 以旧换新',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/22563/37/19495/146076/628c6f4aE4a5e8e2d/4a2dd2c3f1dfbec2.jpg',
    tags: ['12V', '60Ah', '免维护'],
    price: '428.00',
    priceNoTax: '378.76',
    promo: '',
    volume: '1只',
    sold: '月销 963',
    shop: '风帆官方旗舰店',
    location: '华南仓',
  },
  {
    id: 'b3',
    title: '骆驼 汽车蓄电池 6-QW-70(700) 12V 70Ah 启停电瓶 AGM',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/125875/27/28243/141522/6253f31fE1a0e0b57/ddee1cec6363bc0d.jpg',
    tags: ['12V', '70Ah', 'AGM 启停'],
    price: '768.00',
    priceNoTax: '680.53',
    promo: '',
    volume: '1只',
    sold: '月销 527',
    shop: '骆驼电池京东自营旗舰店',
    location: '全国多仓',
  },
];

export const BRAKE_PAD_PRODUCTS: ProductItem[] = [
  {
    id: 'bp1',
    title: '博世 刹车片前片 雨燕/天语SX4/奥拓 0986AB1234 盘式制动片',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/111502/35/20579/163020/61f8e4d0Ed0b0a4f5/9a1aefdd0b2e6900.jpg',
    tags: ['前片', '博世', '盘式'],
    price: '138.00',
    priceNoTax: '122.12',
    promo: '',
    volume: '1套',
    sold: '月销 1,205',
    shop: '博世汽车配件旗舰店',
    location: '华东仓',
  },
  {
    id: 'bp2',
    title: '菲罗多 刹车片 前片 本田雅阁/思域专用 FDB1234',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/112233/29/20548/143210/61f8e534E0c3bc6e2/af6f4a5aa4b2c3e6.jpg',
    tags: ['前片', '菲罗多', '低粉尘'],
    price: '268.00',
    priceNoTax: '237.17',
    promo: '秒杀',
    volume: '1套',
    sold: '月销 643',
    shop: '菲罗多官方旗舰店',
    location: '华南仓',
  },
  {
    id: 'bp3',
    title: '开思严选 陶瓷刹车片 前片 大众速腾/高尔夫7 专用',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/148037/12/19413/132223/5ff6a37bE0de9a2ce/6fd5c2aed4c0f6d3.jpg',
    tags: ['前片', '陶瓷配方', '静音'],
    price: '198.00',
    priceNoTax: '175.22',
    promo: '',
    volume: '1套',
    sold: '月销 389',
    shop: '开思严选旗舰店',
    location: '华北仓',
  },
];

export const BRAKE_DISC_PRODUCTS: ProductItem[] = [
  {
    id: 'bd1',
    title: 'TRW 刹车盘 前轮盘 适配大众朗逸/帕萨特 单片装',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/135642/1/23121/126540/61f8e5a2E2f5b14e9/c4b0bcd8dfd6bc16.jpg',
    tags: ['前轮', 'TRW', '通风盘'],
    price: '320.00',
    priceNoTax: '283.19',
    promo: '',
    volume: '1只',
    sold: '月销 276',
    shop: 'TRW旗舰店',
    location: '华东仓',
  },
  {
    id: 'bd2',
    title: '布雷博 刹车盘 前轮盘 思域/思铂睿 专用 高碳钢',
    image: 'https://img10.360buyimg.com/n7/jfs/t1/192212/9/20546/151223/6110ac7cEb4c32a5f/0f5e0b8f58bd2d96.jpg',
    tags: ['前轮', '布雷博', '高碳'],
    price: '598.00',
    priceNoTax: '529.20',
    promo: '活动',
    volume: '1只',
    sold: '月销 198',
    shop: 'Brembo官方旗舰店',
    location: '华南仓',
  },
];

export const CATEGORY_PRODUCT_MAP: Record<string, ProductItem[]> = {
  oil: OIL_PRODUCTS,
  battery: BATTERY_PRODUCTS,
  brake_pad: BRAKE_PAD_PRODUCTS,
  brake_disc: BRAKE_DISC_PRODUCTS,
};

// --- Customer & Vehicle List Data ---

export const CUSTOMER_LIST_DATA: CustomerItem[] = [
  {
    id: 'c1',
    name: '飞龙',
    phone: '18707087255',
    summary: '本田 飞度 1.3L 2011 1.3 手动 舒适版',
    tags: ['潜在客户'],
  },
  {
    id: 'c2',
    name: '云GFK136',
    phone: '18900010002',
    summary: '广汽传祺 E8新能源 2.0L 2024 2.0 自动 150km MAX',
    tags: ['潜在客户'],
  },
  {
    id: 'c3',
    name: '先生',
    phone: '18888888888',
    summary: '丰田 亚洲龙 2.5L 2019 双擎 2.5 无级 Limited旗舰版',
    tags: ['潜在客户'],
  },
];

export const VEHICLE_LIST_DATA: VehicleItem[] = [
  {
    id: 'v1',
    plate: '粤AF62762',
    ownerName: '先生',
    phone: '18888888888',
    model: '理想 L9 1.5T 2024 Pro',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Li_Auto_Logo.svg',
  },
  {
    id: 'v2',
    plate: '粤E8K96H',
    ownerName: '先生',
    phone: '18888888888',
    model: '大众 朗逸 1.5L 2025 新锐 1.5 手自一体 出众新逸版',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg',
  },
  {
    id: 'v3',
    plate: '粤BCK2339',
    ownerName: '先生',
    phone: '18888888888',
    model: '特斯拉 Model 3 电动 2023 焕新版 后轮驱动',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
  },
];

// --- Work Order List Data ---

export const WORK_ORDER_LIST_DATA: WorkOrderItem[] = [
  {
    id: 'wo1',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
    plate: '川G7WJH82',
    customerName: '测试交石',
    price: '350',
    orderStatus: 'billed',
    vehicleInfo: '2011款 华晨宝马 华晨宝马5系 三厢 2.5L 手...',
    receptionTime: '2025-12-03 09:19',
    receptionStaff: '刘创',
    projects: [
      { id: 'p1', name: '1.250H保养', technician: '刘创', status: 'not_started' }
    ],
    expandable: true,
  },
  {
    id: 'wo2',
    brandLogo: '',
    plate: '津FMF123',
    customerName: '客服小傅测试',
    price: '0',
    orderStatus: 'cancelled',
    vehicleInfo: '无车型信息',
    receptionTime: '2025-12-03 06:27',
    receptionStaff: '刘创',
    projects: [
      { id: 'p2', name: '1.更换左下球头', status: 'not_started' }
    ],
  },
  {
    id: 'wo3',
    brandLogo: '',
    plate: '云A98392',
    customerName: '西西',
    price: '310',
    orderStatus: 'billed',
    vehicleInfo: '圣路 圣路运钞车 2.8L 129马力 厢式专用车...',
    receptionTime: '2025-12-03 06:26',
    receptionStaff: '刘创',
    projects: [
      { id: 'p3', name: '1.更换刹车片', status: 'not_started' },
      { id: 'p4', name: '2.更换空气滤芯', status: 'not_started' },
      { id: 'p5', name: '3.线路检查及维修', status: 'not_started' }
    ],
    expandable: true,
  },
  {
    id: 'wo4',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
    plate: 'HD7',
    customerName: '吴总Jdhxbx',
    price: '1,182',
    orderStatus: 'paid',
    vehicleInfo: '宝马525Li 2017 2.0T 手自一体 豪华设计...',
    receptionTime: '2025-12-02 14:30',
    receptionStaff: '李师傅',
    projects: [
      { id: 'p6', name: '1.机油更换', technician: '李师傅', status: 'completed' },
      { id: 'p7', name: '2.空滤更换', technician: '李师傅', status: 'completed' }
    ],
    expandable: true,
  },
];