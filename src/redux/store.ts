import apiReducer from './apiOwnerSlice';
import loginReducer from './loginSlice';
import stationReducer from './stationSlice';
import lineReducer from './lineSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  api: apiReducer,
  login: loginReducer,
  station: stationReducer,
  line: lineReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
