import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { requestAuth } from "../apis/user";

interface LoginInfo {
  email: string;
  password: string;
}

interface SignupInfo {
  email: string;
  password: string;
  age: number;
}

interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: false,
};

export const logout = createAction("[AUTH] LOGOUT");

export const checkAccessToken = createAsyncThunk("[AUTH] CHECK_ACCESS_TOKEN", async () => {
  const accessToken = localStorage.getItem("accessToken") || "";

  await requestAuth.getUserInfo(accessToken);
});

export const login = createAsyncThunk("[AUTH] LOGIN", async ({ email, password }: LoginInfo) => {
  const accessToken = await requestAuth.login(email, password);

  localStorage.setItem("accessToken", accessToken);
});

export const signup = createAsyncThunk("[AUTH] SIGNUP", async ({ email, password, age }: SignupInfo, thunkAPI) => {
  await requestAuth.signup(email, password, age);

  thunkAPI.dispatch(login({ email, password }));
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [checkAccessToken.fulfilled.type]: (state) => {
      state.isLogin = true;
    },
    [checkAccessToken.rejected.type]: (state) => {
      state.isLogin = false;
    },
    [login.fulfilled.type]: (state) => {
      state.isLogin = true;
    },
    [login.rejected.type]: (state) => {
      state.isLogin = false;
    },
    [logout.type]: (state) => {
      state.isLogin = false;
    },
  },
});

export default authSlice.reducer;
