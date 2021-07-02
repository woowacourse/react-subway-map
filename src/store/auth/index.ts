import { createSlice, isAllOf, PayloadAction } from "@reduxjs/toolkit";

import { checkAccessToken, login, logout, resetError, signup } from "./thunks";

import {
  isPendingAction,
  isRejectedAction,
} from "../@shared/checkThunkActionStatus";
import { AuthState, isAuthAction } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        localStorage.removeItem("accessToken");
        state.isAuthenticated = false;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkAccessToken.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(resetError, (state) => {
        state.error = null;
      })
      .addMatcher(isAllOf(isAuthAction, isPendingAction), (state) => {
        state.loading = true;
      })
      .addMatcher(
        isAllOf(isAuthAction, isRejectedAction),
        (state, { payload }: PayloadAction<Error>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

const action = {
  checkAccessToken,
  login,
  logout,
  signup,
  resetError,
};

export default authSlice.reducer;
export { authSlice };
export { action };
