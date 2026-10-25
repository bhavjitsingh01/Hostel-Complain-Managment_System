import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSession, setSession, clearSession, getUsers, saveUsers, generateId } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    const session = await getSession();
    if (session) {
      setUser(session);
    }
    setLoading(false);
  };

  const login = useCallback(async (email, password, role) => {
    const users = await getUsers();
    const foundUser = users.find(
      u => u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const sessionData = { ...foundUser };
      delete sessionData.password;
      await setSession(sessionData);
      setUser(sessionData);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const signup = useCallback(async (userData) => {
    const users = await getUsers();
    
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser = {
      id: generateId('USR'),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    await saveUsers(users);
    
    const sessionData = { ...newUser };
    delete sessionData.password;
    await setSession(sessionData);
    setUser(sessionData);
    
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!user) return { success: false };
    
    const users = await getUsers();
    const index = users.findIndex(u => u.id === user.id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      await saveUsers(users);
      
      const sessionData = { ...users[index] };
      delete sessionData.password;
      await setSession(sessionData);
      setUser(sessionData);
      
      return { success: true };
    }
    
    return { success: false };
  }, [user]);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isWarden: user?.role === 'warden',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}