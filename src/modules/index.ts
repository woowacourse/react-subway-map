import { configureStore } from "@reduxjs/toolkit";

import stationReducer from "./station";

const reducer = {
  station: stationReducer,
};

const store = configureStore({
  reducer,
});

export default store;
