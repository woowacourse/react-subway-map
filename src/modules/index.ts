import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import stationReducer from "./station";

const reducer = {
  station: stationReducer,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
