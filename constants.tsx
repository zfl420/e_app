import { 
  ScanLine, ShoppingCart, CircleDollarSign, Store, FileText, Package, 
  FileSignature, Car, ClipboardList, Share2, 
  Droplets, Battery, Disc, CircleDot, Database, Filter, Gauge, LayoutGrid,
  Home, MessageCircle, Plus, FileQuestion, User, Play, Search
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
  { id: '1', title: '拳王间的透修理不踩漏', author: '吴明阳', imageUrl: 'https://picsum.photos/400/600?random=1' },
  { id: '2', title: '换刹车片怕被忽悠？', author: '吴明阳', imageUrl: 'https://picsum.photos/400/600?random=2' },
  { id: '3', title: '轮胎鼓包/裂纹 千万别“凑合”', author: '佳通轮胎', imageUrl: 'https://picsum.photos/400/600?random=3' },
  { id: '4', title: '什么是好门店', author: '波哥八点半', imageUrl: 'https://picsum.photos/400/600?random=4' },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', icon: Home, isActive: true },
  { id: 'chat', label: '沟通', icon: MessageCircle },
  { id: 'publish', label: '发布询价', icon: Plus, isPrimary: true },
  { id: 'inquiry', label: '询价单', icon: FileQuestion },
  { id: 'profile', label: '我的', icon: User },
];