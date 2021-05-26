import { configureStore } from '@reduxjs/toolkit';
import LOCAL_STORAGE_KEYS from './constants/localStorageKeys';
import authReducer from './slices/authSlice';
import stationReducer from './slices/stationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    station: stationReducer,
  },
});

store.subscribe(() => {
  const { accessToken, server } = store.getState().auth;

  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LOCAL_STORAGE_KEYS.SERVER, server);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
