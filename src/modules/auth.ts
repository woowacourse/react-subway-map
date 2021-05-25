import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const login = createAsyncThunk("auth/login", async ({ email, password }: LoginInfo) => {
  const accessToken = await requestAuth.login(email, password);

  localStorage.setItem("accessToken", accessToken);
});

export const signup = createAsyncThunk("auth/singup", async ({ email, password, age }: SignupInfo, thunkAPI) => {
  await requestAuth.signup(email, password, age);

  thunkAPI.dispatch(login({ email, password }));
});
