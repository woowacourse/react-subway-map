import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import authReducer from './authSlice';
import stationReducer from './stationSlice';
import lineReducer from './lineSlice';
import sectionReducer from './sectionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  station: stationReducer,
  line: lineReducer,
  section: sectionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
