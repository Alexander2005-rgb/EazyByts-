import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const defaultTheme = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.setAttribute('data-theme', theme.mode);
  }, [theme]);

  const toggleMode = () => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const updateColors = (primaryColor, secondaryColor) => {
    setTheme((prev) => ({
      ...prev,
      primaryColor,
      secondaryColor,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
