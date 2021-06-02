import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import serverSlice from './serverSlice';

const store = configureStore({
  reducer: {
    authSlice,
    serverSlice,
  },
});

export default store;
