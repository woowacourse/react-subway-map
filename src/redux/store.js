import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import stationReducer from './stationSlice';
import lineReducer from './lineSlice';
import mapReducer from './mapSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: { user: userReducer, station: stationReducer, line: lineReducer, map: mapReducer },
  middleware: customizedMiddleware,
});
