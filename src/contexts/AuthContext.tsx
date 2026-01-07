import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'demand_dashboard_auth';
const REMEMBER_KEY = 'demand_dashboard_remember';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const remembered = localStorage.getItem(REMEMBER_KEY);
    const storage = remembered === 'true' ? localStorage : sessionStorage;
    const storedAuth = storage.getItem(STORAGE_KEY);
    
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed.user);
      } catch {
        storage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }

    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      role: 'Admin',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    const storage = rememberMe ? localStorage : sessionStorage;
    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, 'true');
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
    
    storage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser }));
    setUser(mockUser);
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Password must be at least 6 characters');
    }

    const mockUser: User = {
      id: '1',
      email,
      name,
      role: 'User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser }));
    setUser(mockUser);
    setIsLoading(false);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      const remembered = localStorage.getItem(REMEMBER_KEY);
      const storage = remembered === 'true' ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY, JSON.stringify({ user: updatedUser }));
    }
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, this would send a reset email
    console.log('Password reset email sent to:', email);
  };

  const resetPassword = async (token: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    console.log('Password reset with token:', token);
  };

  const verifyEmail = async (token: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email verified with token:', token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        forgotPassword,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
