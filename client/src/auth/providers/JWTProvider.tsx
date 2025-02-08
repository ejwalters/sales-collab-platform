import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { supabase } from '@/supabaseClient';

interface AuthContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentUser: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
}

// ✅ Exporting AuthContext explicitly
export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // ✅ Fetch user session on load
  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setCurrentUser(data.user);
      }
      setLoading(false);
    };

    loadUser();

    // ✅ Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Login Function
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setCurrentUser(data.user);
  };

  // ✅ Register Function
  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setCurrentUser(data.user);
  };

  // ✅ Logout Function
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  // ✅ Verify User Function
  const verify = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  };

  return (
    <AuthContext.Provider value={{ loading, setLoading, currentUser, login, register, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};

// ✅ Explicitly exporting AuthContext and AuthProvider
export { AuthProvider };
