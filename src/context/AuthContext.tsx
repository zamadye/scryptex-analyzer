
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name: string;
  joinDate: string;
  walletAddress?: string;
  twitterHandle?: string;
  analyzedProjects: string[];
  farmedProjects: string[];
  tweetedProjects: string[];
  xp: number;
  referralCode: string;
  invites: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  connectWallet: (address: string) => void;
  connectTwitter: (handle: string) => void;
  getXpLevel: () => { level: number; title: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    
    if (storedLoggedIn && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Generate a random referral code
  const generateReferralCode = () => {
    return 'SCX' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage (for demo)
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      // In real app, check password hash
      setUser(existingUser);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(existingUser));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.some((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      email,
      name,
      joinDate: new Date().toISOString(),
      analyzedProjects: [],
      farmedProjects: [],
      tweetedProjects: [],
      xp: 0,
      referralCode: generateReferralCode(),
      invites: 0
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in the new user
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    // Don't remove the users list
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Also update in the users array
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: User) => 
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const connectWallet = (address: string) => {
    updateUser({ walletAddress: address });
  };

  const connectTwitter = (handle: string) => {
    updateUser({ twitterHandle: handle });
  };

  const getXpLevel = () => {
    if (!user) return { level: 0, title: 'Novice' };
    
    const xp = user.xp;
    
    if (xp < 10) return { level: 1, title: 'Explorer' };
    if (xp < 25) return { level: 2, title: 'Contributor' };
    if (xp < 50) return { level: 3, title: 'Builder' };
    if (xp < 100) return { level: 4, title: 'Pioneer' };
    return { level: 5, title: 'Master' };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      login, 
      signup, 
      logout, 
      updateUser,
      connectWallet,
      connectTwitter,
      getXpLevel
    }}>
      {children}
    </AuthContext.Provider>
  );
};
