import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import stationReducer from './stationSlice';
import lineReducer from './lineSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  station: stationReducer,
  line: lineReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
