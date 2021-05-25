import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import stationReducer from './stationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  station: stationReducer,
});

export default configureStore({
  reducer: rootReducer,
});
