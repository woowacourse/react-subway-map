import { configureStore } from '@reduxjs/toolkit';
import userReducer from './signInSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

export { setToken, clearToken } from './signInSlice';
