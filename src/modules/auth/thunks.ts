import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { auth } from "../../apis";

import { LoginInfo, SignupInfo } from "../../types/auth";
import { ERROR_DURATION } from "../../constants";

const resetError = createAction("[AUTH] RESET_ERROR");
const logout = createAction("[AUTH] LOGOUT");

const checkAccessToken = createAsyncThunk(
  "[AUTH] CHECK_ACCESS_TOKEN",
  async (_, { dispatch, rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken") || "";

    const response = await auth.getUserInfo(accessToken);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }
  }
);

const login = createAsyncThunk(
  "[AUTH] LOGIN",
  async ({ email, password }: LoginInfo, { dispatch, rejectWithValue }) => {
    const response = await auth.login(email, password);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    localStorage.setItem("accessToken", response.result.accessToken);

    return response.result;
  }
);

const signup = createAsyncThunk(
  "[AUTH] SIGNUP",
  async (
    { email, password, age }: SignupInfo,
    { dispatch, rejectWithValue }
  ) => {
    const response = await auth.signup(email, password, age);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    dispatch(login({ email, password }));

    return response.result;
  }
);

export { resetError, logout, checkAccessToken, login, signup };
