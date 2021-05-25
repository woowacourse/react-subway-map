import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../pages/Signup/slice";

export default configureStore({
  reducer: { signup: signupReducer },
});
