import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import stationReducer from './slices/stationSlice';
import lineReducer from './slices/lineSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    station: stationReducer,
    line: lineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
