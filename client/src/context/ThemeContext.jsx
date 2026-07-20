import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const storageKey = "githero-theme";

const normalizeTheme = (theme) => (theme === "light" || theme === "white" ? "light" : "dark");

export const getPreferredTheme = () => {
  const saved = localStorage.getItem(storageKey);
  return saved
    ? normalizeTheme(saved)
    : window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
};

export const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getPreferredTheme);

  const setTheme = (nextTheme) => {
    const normalized = normalizeTheme(nextTheme);
    localStorage.setItem(storageKey, normalized);
    setThemeState(normalized);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
