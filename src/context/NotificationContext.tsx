
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [lastNotification, setLastNotification] = useState<{
    title: string;
    message: string;
    timestamp: number;
  } | null>(null);
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const now = Date.now();
    
    // Prevent duplicate notifications within 3 seconds
    if (
      lastNotification && 
      lastNotification.title === notification.title && 
      lastNotification.message === notification.message &&
      now - lastNotification.timestamp < 3000
    ) {
      return; // Skip this notification as it's a duplicate
    }
    
    const newNotification: Notification = {
      ...notification,
      id: now.toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setLastNotification({
      title: notification.title,
      message: notification.message,
      timestamp: now
    });
    
    // Show toast for new notification, auto-dismiss after 3 seconds
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount,
      addNotification, 
      markAsRead, 
      markAllAsRead,
      clearNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
