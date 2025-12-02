import { 
  ScanLine, ShoppingCart, CircleDollarSign, Store, FileText, Package, 
  FileSignature, Car, ClipboardList, Share2, 
  Droplets, Battery, Disc, CircleDot, Database, Filter, Gauge, LayoutGrid,
  Home, MessageCircle, Plus, FileQuestion, User
} from 'lucide-react';
import { MenuItem, TaskItem, NavItem, VideoItem, ChatThread, Contact, ChatMessage } from './types';

export const TOP_ACTIONS: MenuItem[] = [
  { id: 'pay', label: '快捷收款', icon: CircleDollarSign },
  { id: 'price', label: '查4S价', icon: Store },
  { id: 'catalog', label: '电子目录', icon: FileText },
  { id: 'inventory', label: '库存查询', icon: Package },
];

export const MANAGEMENT_ACTIONS: MenuItem[] = [
  { id: 'bill', label: '接车开单', icon: FileSignature, color: 'text-blue-600' },
  { id: 'customer', label: '客户车辆', icon: Car, color: 'text-indigo-600' },
  { id: 'workorders', label: '工单列表', icon: ClipboardList, color: 'text-orange-600' },
  { id: 'marketing', label: '做营销', icon: Share2, color: 'text-pink-600' },
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
    title: '拳王间的透修理不踩漏', 
    author: '吴明阳', 
    // Mechanic working / garage
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&h=600&q=80' 
  },
  { 
    id: '2', 
    title: '换刹车片怕被忽悠？', 
    author: '吴明阳', 
    // Car parts / brakes
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-01b80258e0a5?auto=format&fit=crop&w=400&h=600&q=80' 
  },
  { 
    id: '3', 
    title: '轮胎鼓包/裂纹 千万别“凑合”', 
    author: '佳通轮胎', 
    // Tire close up
    imageUrl: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?auto=format&fit=crop&w=400&h=600&q=80' 
  },
  { 
    id: '4', 
    title: '什么是好门店', 
    author: '波哥八点半', 
    // Professional manager
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=600&q=80' 
  },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'chat', label: '沟通', icon: MessageCircle },
  { id: 'publish', label: '发布询价', icon: Plus, isPrimary: true },
  { id: 'inquiry', label: '询价单', icon: FileQuestion },
  { id: 'profile', label: '我的', icon: User },
];

// --- Parts List Data ---

export const SIDEBAR_CATEGORIES = [
  '油品', '蓄电池', '轮胎', '滤清系统', '点火系统', '制动系统', '养护用品', '雨刮系统', '照明系统', '正时附件', '悬挂系统', '传动系统', '工具耗材', '其他'
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
  '油品': {
    subcategories: [
      { name: '机油', img: 'https://images.unsplash.com/photo-1560579183-c288f3435c24?w=150&h=150&fit=crop&q=80' },
      { name: '刹车油', img: 'https://images.unsplash.com/photo-1626127027471-7eb9277d3394?w=150&h=150&fit=crop&q=80' },
      { name: '波箱油', img: 'https://images.unsplash.com/photo-1608613437533-332997c452df?w=150&h=150&fit=crop&q=80' },
      { name: '齿轮油', img: 'https://images.unsplash.com/photo-1580228026131-081036df5295?w=150&h=150&fit=crop&q=80' },
      { name: '方向机油', img: 'https://images.unsplash.com/photo-1609630985558-86d4e8c18731?w=150&h=150&fit=crop&q=80' },
      { name: '差速器油', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop&q=80' },
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
  '蓄电池': {
    subcategories: [
      { name: 'AGM电池', img: 'https://images.unsplash.com/photo-1622383849929-79841f3e9c5f?w=150&h=150&fit=crop&q=80' },
      { name: '免维护电池', img: 'https://images.unsplash.com/photo-1614741118868-607c31c885ea?w=150&h=150&fit=crop&q=80' },
      { name: 'EFB电池', img: 'https://images.unsplash.com/photo-1622383849929-79841f3e9c5f?w=150&h=150&fit=crop&q=80' },
    ],
    brands: [
        { name: '瓦尔塔', code: 'VARTA' },
        { name: '骆驼', code: 'Camel' },
        { name: '风帆', code: 'Sail' },
    ]
  },
  '轮胎': {
      subcategories: [
          { name: '四季胎', img: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?w=150&h=150&fit=crop&q=80' },
          { name: '雪地胎', img: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?w=150&h=150&fit=crop&q=80' },
          { name: '防爆胎', img: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?w=150&h=150&fit=crop&q=80' },
      ],
      brands: [
          { name: '米其林', code: 'Michelin' },
          { name: '普利司通', code: 'Bridge' },
          { name: '固特异', code: 'Goodyear' },
          { name: '马牌', code: 'Continental' },
      ]
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