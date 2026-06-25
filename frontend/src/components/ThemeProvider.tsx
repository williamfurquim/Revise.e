import { createContext } from 'react';
import { useState, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (value: boolean | ((prev: boolean) => boolean)) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      isDark ? "dark" : "white"
    );

    if (isDark) {
      document.body.classList.remove('white-theme');
    } else {
      document.body.classList.add('white-theme');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{
      isDark,
      setIsDark
    }}>
      {children}
    </ThemeContext.Provider>

  );
}