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
  isActive?: boolean;
  isPrimary?: boolean; // For the big middle button
}