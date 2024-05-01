import React from "react";
import { useState } from "react";

import { createContext } from "react";

const themeContext = createContext<null | {isDark: boolean; handleTheme: () => void // true if dark mode is preferred by the user in the configuration of the operating system,
}>(null);

const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {
  const [actualTheme, setActualTheme] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleTheme = () => {
    setActualTheme((actual) => !actual);
  }

  return (
    /* En value se pasan los valores que se van a compartir con los componentes hijos, puedes pasar cualquier cosa que quieras compartir como funciones, objetos, etc */
    /* Aqui se guardan los datos que entraran en el context themeContext */
    <themeContext.Provider value={{isDark: actualTheme, handleTheme }}>
      {children}
    </themeContext.Provider>
  )
}

export {themeContext, ThemeContextProvider}