import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { request } from '../services/httpRequest';
import { ACCESS_TOKEN } from '../constants';

const login = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await request.postWithoutToken('/login/token', { email, password });
    const { accessToken } = response.data;

    if (response.status === 200) {
      Cookies.set(ACCESS_TOKEN, accessToken);
      return { email };
    }
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const loginByToken = createAsyncThunk('user/loginByToken', async ({ accessToken }, thunkAPI) => {
  try {
    const response = await request.get('/members/me');

    if (response.status === 200) {
      return { email: response.email };
    }
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    isLogin: false,
    isLoading: false,
    isLoginFail: false,
  },
  reducers: {
    logout: (state) => {
      state.email = null;
      state.isLogin = false;
      state.isLoginFail = false;
    },
    clearLoginFail: (state) => {
      state.isLoginFail = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { email } = action.payload;

      state.email = email;
      state.isLogin = true;
      state.isLoading = false;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.rejected]: (state) => {
      state.isLoading = false;
      state.isLoginFail = true;
    },
    [loginByToken.fulfilled]: (state, action) => {
      const { email } = action.payload;

      state.email = email;
      state.isLogin = true;
      state.isLoading = false;
    },
    [loginByToken.pending]: (state) => {
      state.isLoading = true;
    },
    [loginByToken.rejected]: (state) => {
      state.isLoading = false;
      state.isLoginFail = true;
    },
  },
});

export { login, loginByToken };
export const { logout, clearLoginFail } = userSlice.actions;

export default userSlice.reducer;
