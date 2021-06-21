import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN } from '../constants';
import { request } from '../services/httpRequest';

const login = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await request.postWithoutToken('/login/token', { email, password });
    const { accessToken } = response.data;

    if (response.status === 200) {
      Cookies.set(ACCESS_TOKEN, accessToken);
      return { email };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const signUp = createAsyncThunk('user/signUp', async ({ email, age, password }, thunkAPI) => {
  try {
    await request.postWithoutToken('/members', { email, age, password });
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(e);
  }
});

const loginByToken = createAsyncThunk('user/loginByToken', async ({ accessToken }, thunkAPI) => {
  try {
    const response = await request.get('/members/me');

    if (response.status === 200) {
      return { email: response.data.email };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(e);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    isLogin: false,
    isLoading: false,
    error: '',
  },
  reducers: {
    logout: (state) => {
      state.email = null;
      state.isLoading = false;
      state.isLogin = false;
      state.error = '';
    },
    clearLoginState: (state) => {
      state.error = '';
      state.isLoading = false;
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
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [signUp.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
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
    [loginByToken.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export { login, loginByToken, signUp };
export const { logout, clearLoginState } = userSlice.actions;

export default userSlice.reducer;
