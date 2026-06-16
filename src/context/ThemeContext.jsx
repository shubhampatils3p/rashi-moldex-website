import React, { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext();

const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('rashi-theme') : null;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(savedTheme || 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    localStorage.setItem('rashi-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
