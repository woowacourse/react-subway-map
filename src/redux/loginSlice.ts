import { createSlice } from '@reduxjs/toolkit';
import { SESSION_STORAGE_KEY } from '../constants/storage';
import {
  getSessionStorageItem,
  removeSessionStorageItem,
  setSessionStorageItem,
} from '../util/sessionStorage';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: getSessionStorageItem(SESSION_STORAGE_KEY.ACCESS_TOKEN) !== null,
  },
  reducers: {
    login: (state, action) => {
      setSessionStorageItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, action.payload);
      state.isLogin = true;
    },
    logout: (state) => {
      removeSessionStorageItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
      state.isLogin = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
