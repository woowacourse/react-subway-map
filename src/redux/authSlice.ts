import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import MESSAGE from 'constants/message';

export interface SignupPayload {
  email: string;
  password: string;
  age: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const signupAsync = createAsyncThunk('auth/signupAsync', async ({ email, password, age }: SignupPayload) => {
  await axios.post(`/members`, {
    email,
    password,
    age,
  });
});

export const loginAsync = createAsyncThunk('auth/loginAsync', async ({ email, password }: LoginPayload) => {
  const response = await axios.post(`/login/token`, {
    email,
    password,
  });

  return response.data.accessToken;
});

const initialState: { accessToken: string | null } = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupAsync.rejected, () => {
      throw Error(MESSAGE.SIGNUP.FAIL);
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
    builder.addCase(loginAsync.rejected, () => {
      throw Error(MESSAGE.LOGIN.FAIL);
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
