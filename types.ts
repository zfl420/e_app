import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
}

export interface TaskItem {
  id: string;
  plate: string;
  status: 'pending_pay' | 'pending_work';
  serviceType: string;
  isUrgent?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  views?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean; // Deprecated in favor of props
  isPrimary?: boolean; // For the big middle button
}

export interface ChatThread {
  id: string;
  name: string;
  avatar?: string;
  isSystem?: boolean;
  type?: 'system' | 'service' | 'user';
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
  type: 'text' | 'image' | 'system';
}

export interface InquiryPart {
  name: string;
  code: string;
  date: string;
}

export interface InquiryItem {
  id: string;
  brandName: string; // Used for placeholder logo
  carModel: string;
  vin: string;
  status: 'pending' | 'quoted' | 'expired';
  parts: InquiryPart[];
  showCart?: boolean;
}

export interface ArrivalItem {
  id: string;
  plate: string;
  model: string;
  brandLogo: string;
  status: 'received' | 'pending' | 'working' | 'finished';
  subStatus: string;
  time: string;
  sa: string;
  tech: string;
  tags: { text: string; color: string; icon?: 'check' | 'alert' | 'dots' }[];
  workOrderSummary: string;
  location: string;
}

export interface ProductItem {
  id: string;
  title: string;
  image: string;
  tags: string[];
  price: string;
  priceNoTax: string;
  promo?: string;
  volume: string;
  sold: string;
  shop: string;
  location: string;
  brand?: string;
  specs?: string;
  applicableModels?: string[];
  attributes?: {
    viscosity?: string; // 粘度SAE，如 "5W-30"
    api?: string; // 美标API，如 "SP"
    netContent?: string; // 净含量(L)
    baseOil?: string; // 基础油类型
    voltage?: string; // 电压，如 "12V"
    capacity?: string; // 容量，如 "60Ah"
    type?: string; // 类型，如 "前片"、"后片"
    material?: string; // 材质，如 "陶瓷"、"低金属"
    [key: string]: string | undefined; // 允许其他属性
  };
}

export interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  summary: string;
  tags?: string[];
}

export interface VehicleItem {
  id: string;
  plate: string;
  ownerName: string;
  phone: string;
  model: string;
  brandLogo?: string;
}

export interface WorkOrderProject {
  id: string;
  name: string;
  technician?: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface WorkOrderItem {
  id: string;
  brandLogo: string;
  plate: string;
  customerName: string;
  price: string;
  orderStatus: 'billed' | 'cancelled' | 'paid' | 'pending';
  vehicleInfo: string;
  receptionTime: string;
  receptionStaff: string;
  projects: WorkOrderProject[];
  accessories?: { name: string; quantity: number; price: string }[];
  expandable?: boolean;
}

export interface CartItem {
  id: string;
  storeName: string;
  storeLocation: string;
  cutOffTimes: string[];
  productId: string;
  productName: string;
  productImage: string;
  brandPartNumber?: string;
  originalPartNumber?: string;
  brandPart?: string;
  location: string;
  price: number;
  quantity: number;
  selected: boolean;
  returnPolicy?: string;
  guarantees?: string[];
  // 从商品列表添加的商品字段
  specs?: string;
  brand?: string;
  volume?: string;
}

export interface SearchParams {
  keyword?: string;
  brand?: string;
  attributes?: Record<string, string>;
}

export interface ScanResult {
  productId?: string;
  productName?: string;
  brand?: string;
  confidence?: number;
}