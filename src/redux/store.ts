import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import apiReducer from './slice/apiOwnerSlice';
import lineReducer, { clearLines } from './slice/lineSlice';
import loginReducer from './slice/loginSlice';
import stationReducer, { clearStations } from './slice/stationSlice';

const rootReducer = combineReducers({
  api: apiReducer,
  login: loginReducer,
  station: stationReducer,
  line: lineReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const clearRootReducer = (): void => {
  store.dispatch(clearStations());
  store.dispatch(clearLines());
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export interface ErrorMessageResponse {
  errorMessage: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
