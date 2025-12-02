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