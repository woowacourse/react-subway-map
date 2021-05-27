import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import loginReducer from './slices/login';
import APIReducer from './slices/API';
import lineReducer from './slices/line';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    API: APIReducer,
    line: lineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
