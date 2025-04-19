
import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface XPContextType {
  addXP: (amount: number, action: string) => void;
  xp: number; // Add xp property
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export const useXP = () => {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
};

export const XPProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUser } = useAuth();
  const { addNotification } = useNotifications();
  
  const addXP = (amount: number, action: string) => {
    if (!user) return;
    
    // Update user XP
    const newXP = (user.xp || 0) + amount;
    updateUser({ xp: newXP });
    
    // Show notification
    addNotification({
      title: `+${amount} XP Earned`,
      message: `You earned XP for: ${action}`,
      type: 'success'
    });
  };
  
  // Get current XP from user
  const xp = user?.xp || 0;
  
  return (
    <XPContext.Provider value={{ addXP, xp }}>
      {children}
    </XPContext.Provider>
  );
};
