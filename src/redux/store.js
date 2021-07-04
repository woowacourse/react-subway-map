import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import lineReducer from './lineSlice';
import mapReducer from './mapSlice';
import stationReducer from './stationSlice';
import userReducer from './userSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: { user: userReducer, station: stationReducer, line: lineReducer, map: mapReducer },
  middleware: customizedMiddleware,
});
