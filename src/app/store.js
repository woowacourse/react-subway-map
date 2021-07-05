import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../pages/Signup/slice";
import loginReducer from "../pages/Login/slice";
import stationsReducer from "../pages/Stations/slice";
import linesReducer from "../pages/Lines/slice";
import overviewReducer from "../pages/Overview/slice";

export default configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    stations: stationsReducer,
    lines: linesReducer,
    overview: overviewReducer,
  },
});
