import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTheme, setTheme } from '../utils/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initTheme();
  }, []);

  const initTheme = async () => {
    const savedTheme = await getTheme();
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setLoading(false);
  };

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    await setTheme(newTheme);
  }, [theme]);

  const value = {
    theme,
    loading,
    toggleTheme,
    setTheme: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}