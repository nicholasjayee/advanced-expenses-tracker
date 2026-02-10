import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { AppNotification, NotificationType } from '../types.ts';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type?: NotificationType, link?: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Mock initial notifications for demonstration
const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Bill Due Soon',
    message: 'Chase Sapphire Reserve minimum payment is due in 3 days.',
    type: 'WARNING',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    link: '/liabilities'
  },
  {
    id: 'n2',
    title: 'High Usage Alert',
    message: 'Electricity usage spiked by 15% yesterday compared to average.',
    type: 'ERROR',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: false,
    link: '/electricity'
  },
  {
    id: 'n3',
    title: 'Dividend Received',
    message: 'Received $120.00 dividend from Apple Inc.',
    type: 'SUCCESS',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isRead: true,
    link: '/income'
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = useCallback((title: string, message: string, type: NotificationType = 'INFO', link?: string) => {
    const newNotification: AppNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date(),
      isRead: false,
      link
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      addNotification, 
      markAsRead, 
      markAllAsRead, 
      removeNotification, 
      clearAll 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};