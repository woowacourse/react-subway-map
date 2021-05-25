import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import stationReducer from "./station";

const reducer = {
  auth: authReducer,
  station: stationReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
