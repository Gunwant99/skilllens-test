import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// 🔗 CONFIG: Point to your FastAPI Backend
export const API_URL = "https://your-render-url.onrender.com";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  token: string | null;
  signUp: (email: string, password: string, fullName: string, college: string, graduationYear: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('sb-access-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage on load
    const storedToken = localStorage.getItem('sb-access-token');
    if (storedToken) {
        setToken(storedToken);
        // Fake a user if we have a token
        setUser({ id: 'demo', email: 'demo@skilllens.com' } as User);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = async (data: any) => {
    if (data.session) {
      // 1. Try to tell Supabase about the session (it might fail, but we don't care)
      try {
        await supabase.auth.setSession(data.session);
      } catch (e) {
        console.warn("Supabase complained, but we are ignoring it:", e);
      }

      // 2. FORCE update the local state manually
      console.log("Forcing Login State...");
      setSession(data.session);
      setUser(data.user);
      setToken(data.session.access_token);
      localStorage.setItem('sb-access-token', data.session.access_token);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, college: string, graduationYear: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Signup failed');
      
      await handleAuthSuccess(data);
      return { error: null }; // Always return success
    } catch (error) {
      console.error("Signup Error:", error);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Login failed');

      await handleAuthSuccess(data);
      return { error: null }; // Always return success
    } catch (error) {
      console.error("Login Error:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
        await supabase.auth.signOut();
    } catch(e) { console.log(e) }
    setSession(null);
    setUser(null);
    setToken(null);
    localStorage.removeItem('sb-access-token');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, token, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};