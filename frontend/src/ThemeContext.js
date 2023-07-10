import { createTheme } from "@mui/material/styles";
import React from "react";

//definition of themes using React MUIs createTheme
export const themes = {
  light: {
    value: createTheme({
      palette: {
        mode: "light",
        background: {
          default: "#fff",
        },
      },
    }),
    isLight: true,
  },
  dark: {
    value: createTheme({
      palette: {
        mode: "dark",
        background: {
          default: "#777",
        },
      },
    }),
    isLight: false,
  },
};

const initialState = {
  theme:
    JSON.parse(localStorage.getItem("themeIsDark")) == true
      ? themes.dark
      : themes.light,
  toggle: () => {},
};

export const ThemeContext = React.createContext(
  initialState //default Context value
);
