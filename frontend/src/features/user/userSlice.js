import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import confiig from "../../config/config.json";
import authHeader from "../../app/AuthHeader";

const initialState = {
  userInfo: {},
  token: null,
  status: "idle",
  error: null,
};

export const register = createAsyncThunk("user/register", async (userInfo) => {
  const response = await axios.post(`${confiig.api}/register`, userInfo, {
    headers: {
      ...authHeader(),
    },
  });

  return response.data;
});

export const login = createAsyncThunk("user/login", async (userInfo) => {
  const response = await axios.post(`${confiig.api}/login`, userInfo, {
    headers: {
      ...authHeader(),
    },
  });

  return response.data;
});

export const loadUserFromLocalStorage = createAsyncThunk(
  "user/loadUserFromLocalStorage",
  async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeCurrentUser(state, action) {
      state.userInfo = {};
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.token = action.payload?.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.token = action.payload?.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUserFromLocalStorage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadUserFromLocalStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
        state.token = action.payload?.token;
      });
  },
});

export const { removeCurrentUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.userInfo;

export const selectCurrentUsersToken = (state) => state.user.token;

export const selectUserManagmentError = (state) => state.user.error;

export const selectStatus = (state) => state.user.status;
