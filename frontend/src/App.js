import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./features/user/Login";
import Register from "./features/user/Register";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "./ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import ExpenseList from "./features/expenses/ExpenseList";
import Categories from "./features/categories/Categories";
import PrivateRoute from "./utilities/PrivateRoute";
import AddExpense from "./features/expenses/AddExpense";
import UpdateExpense from "./features/expenses/UpdateExpense";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Router>
      <MUIThemeProvider theme={theme.value}>
        <CssBaseline />
        <Navigation />
        <Routes>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ExpenseList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="update/:id"
            element={
              <PrivateRoute>
                <UpdateExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
        </Routes>
      </MUIThemeProvider>
    </Router>
  );
}

export default App;
