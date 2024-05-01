import { useContext } from "react";
import { themeContext } from "../context/themeContext";

export const useThemeContext = () => {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }

  return context as { isDark: boolean; handleTheme: () => void };
}