import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import stationReducer from './stationSlice';
import lineReducer from './lineSlice';

export default configureStore({
  reducer: { user: userReducer, station: stationReducer, line: lineReducer },
});
