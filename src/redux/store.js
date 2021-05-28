import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import stationReducer from './stationSlice';
import lineReducer from './lineSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: { user: userReducer, station: stationReducer, line: lineReducer },
  middleware: customizedMiddleware,
});
