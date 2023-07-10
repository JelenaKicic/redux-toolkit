import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import { ThemeContext } from "../ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  selectCurrentUsersToken,
  removeCurrentUser,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentUserToken = useSelector(selectCurrentUsersToken);

  const signOut = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeCurrentUser());
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        {currentUserToken && (
          <React.Fragment>
            <IconButton
              aria-label="add"
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon color="secondary" fontSize="large" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 0.1, display: { xs: "none", sm: "block" } }}
            >
              Expenses
            </Typography>
            <IconButton
              aria-label="add"
              onClick={() => {
                navigate("/categories");
              }}
            >
              <CategoryIcon color="secondary" fontSize="large" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Categories
            </Typography>
          </React.Fragment>
        )}

        <Box>
          {!currentUserToken && (
            <Button
              onClick={() => {
                navigate("/signin");
              }}
              sx={{ color: "#fff" }}
            >
              Sign In
            </Button>
          )}
          {currentUserToken && (
            <Button onClick={signOut} sx={{ color: "#fff" }}>
              Sign Out
            </Button>
          )}
          <Typography variant="div" component="span" sx={{ pl: 3 }}>
            {`${theme.isLight ? "Light" : "Dark"} mode`}
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {theme.isLight ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
