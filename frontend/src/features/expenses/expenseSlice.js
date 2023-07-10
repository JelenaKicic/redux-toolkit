import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authHeader from "../../app/AuthHeader";
import axios from "axios";
import confiig from "../../config/config.json";

const initialState = {
  expenses: [],
};

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (token) => {
    const response = await axios.get(`${confiig.api}/expenses`, {
      headers: {
        ...authHeader({ token: token }),
      },
    });

    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (data) => {
    const response = await axios.post(`${confiig.api}/expenses`, data.expense, {
      headers: {
        ...authHeader({ token: data.token }),
      },
    });

    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
  async (data) => {
    const response = await axios.put(
      `${confiig.api}/expenses/${data.expense.id}`,
      data.expense,
      {
        headers: {
          ...authHeader({ token: data.token }),
        },
      }
    );

    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (data) => {
    const response = await axios.delete(`${confiig.api}/expenses/${data.id}`, {
      headers: {
        ...authHeader({ token: data.token }),
      },
    });

    return response.data;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses = action.payload;
    });
  },
});

export default expenseSlice.reducer;

export const selectExpenses = (state) => state.expense.expenses;

export const selectExpensesByCategoryId = (state, categoryId) => {
  if (categoryId == 0) return state.expense.expenses;

  return state.expense.expenses.filter((expense) => {
    return expense.categoryId == categoryId;
  });
};

export const selectExpenseById = (state, id) =>
  state.expense.expenses.find((expense) => {
    return expense.id == id;
  });
