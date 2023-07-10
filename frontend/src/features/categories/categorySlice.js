import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authHeader from "../../app/AuthHeader";
import axios from "axios";
import confiig from "../../config/config.json";

const initialState = {
  categories: [],
  addCategoryError: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (token) => {
    const response = await axios.get(`${confiig.api}/categories`, {
      headers: {
        ...authHeader({ token: token }),
      },
    });

    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const response = await axios.post(
      `${confiig.api}/categories`,
      data.category,
      {
        headers: {
          ...authHeader({ token: data.token }),
        },
      }
    );

    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (data) => {
    const response = await axios.delete(
      `${confiig.api}/categories/${data.id}`,
      {
        headers: {
          ...authHeader({ token: data.token }),
        },
      }
    );

    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.addCategoryError = action.error.message;
      });
  },
});

export default categorySlice.reducer;

export const selectCategories = (state) => state.category.categories;

export const selectAddCategoryError = (state) =>
  state.category.addCategoryError;

export const selectCategoryById = (state, id) =>
  state.category.categories.find((category) => {
    return category.id == id;
  });
