import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../pages/Signup/slice";
import loginReducer from "../pages/Login/slice";

export default configureStore({
  reducer: { signup: signupReducer, login: loginReducer },
});
