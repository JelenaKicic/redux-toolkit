import React, { useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("themeIsDark")) == true
      ? themes.dark
      : themes.light
  );

  const toggleTheme = () => {
    //setting theme Context object
    setTheme(theme.isLight ? themes.dark : themes.light);
    //saving theme preference to local storage in order to be able to read it after refresh
    localStorage.setItem("themeIsDark", theme.isLight);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
