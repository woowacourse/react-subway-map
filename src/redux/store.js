import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import stationReducer from './stationSlice';

export default configureStore({
  reducer: { user: userReducer, station: stationReducer },
});
