import { configureStore } from '@reduxjs/toolkit';
import subwayReducer from './subwaySlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    subway: subwayReducer,
  },
});

export default store;

export { setUserToken, clearUserToken, getUserTokenThunk } from './userSlice';
export {
  getStationsThunk,
  addStationThunk,
  deleteStationThunk,
  getLinesThunk,
  addLineThunk,
  deleteLineThunk,
  addSectionThunk,
  deleteSectionThunk,
} from './subwaySlice';
