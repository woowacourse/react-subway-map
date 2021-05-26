import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { AuthState, LoginInfo, SignupInfo } from "../@types/types";

import { requestAuth } from "../apis/user";

const initialState: AuthState = {
  isAuthenticated: false,
};

const LOGOUT = "[AUTH] LOGOUT";

const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("accessToken");

  dispatch({
    type: LOGOUT,
  });
};

const checkAccessToken = createAsyncThunk("[AUTH] CHECK_ACCESS_TOKEN", async () => {
  const accessToken = localStorage.getItem("accessToken") || "";

  await requestAuth.getUserInfo(accessToken);
});

const login = createAsyncThunk("[AUTH] LOGIN", async ({ email, password }: LoginInfo) => {
  const accessToken = await requestAuth.login(email, password);

  localStorage.setItem("accessToken", accessToken);
});

const signup = createAsyncThunk("[AUTH] SIGNUP", async ({ email, password, age }: SignupInfo, thunkAPI) => {
  await requestAuth.signup(email, password, age);

  thunkAPI.dispatch(login({ email, password }));
});

export const action = {
  checkAccessToken,
  login,
  signup,
  logout,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [checkAccessToken.fulfilled.type]: (state) => {
      state.isAuthenticated = true;
    },
    [checkAccessToken.rejected.type]: (state) => {
      state.isAuthenticated = false;
    },
    [login.fulfilled.type]: (state) => {
      state.isAuthenticated = true;
    },
    [LOGOUT]: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
