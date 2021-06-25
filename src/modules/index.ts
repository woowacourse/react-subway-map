import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import stationReducer from "./station";
import lineReducer from "./line";
import subwayMapReducer from "./subwayMap";

const reducer = {
  auth: authReducer,
  station: stationReducer,
  line: lineReducer,
  subwayMap: subwayMapReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
