import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import categorySlice from "../features/categories/categorySlice";
import expenseSlice from "../features/expenses/expenseSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    expense: expenseSlice,
  },
});
