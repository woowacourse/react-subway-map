import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import signedUserReducer from './features/signedUserSlice';

export const store = configureStore({
  reducer: {
    signedUser: signedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
