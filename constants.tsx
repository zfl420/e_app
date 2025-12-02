import { 
  ScanLine, ShoppingCart, CircleDollarSign, Store, FileText, Package, 
  FileSignature, Car, ClipboardList, Share2, 
  Droplets, Battery, Disc, CircleDot, Database, Filter, Gauge, LayoutGrid,
  Home, MessageCircle, Plus, FileQuestion, User
} from 'lucide-react';
import { MenuItem, TaskItem, NavItem, VideoItem } from './types';

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
  { id: 'home', label: '首页', icon: Home, isActive: true },
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

// Fill missing categories with generic data for demonstration
SIDEBAR_CATEGORIES.forEach(cat => {
    if (!CATEGORY_SECTIONS[cat]) {
        CATEGORY_SECTIONS[cat] = {
            subcategories: GENERIC_SUBCATEGORIES,
            brands: GENERIC_BRANDS
        };
    }
});