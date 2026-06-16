"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for token and user on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // ignore invalid user JSON
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      const { access_token, user: loggedInUser } = data;
      setToken(access_token);
      setUser(loggedInUser);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      // Set cookies for Next.js middleware
      document.cookie = `token=${access_token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_role=${loggedInUser.role}; path=/; max-age=86400; SameSite=Lax`;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
      // Auto login after register
      await login(email, password);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
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
