import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAllOf,
  AnyAction,
  createAction,
} from "@reduxjs/toolkit";

import { requestAuth } from "../apis/user";

import {
  isPendingAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";
import { LoginInfo, SignupInfo } from "../@types/types";
import { ERROR_DURATION } from "../constants/time";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const isAuthAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[AUTH]");
};

const resetError = createAction("[AUTH] RESET_ERROR");
const logout = createAction("[AUTH] LOGOUT");

const checkAccessToken = createAsyncThunk(
  "[AUTH] CHECK_ACCESS_TOKEN",
  async (_, { dispatch, rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken") || "";

    try {
      await requestAuth.getUserInfo(accessToken);
    } catch (error) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(error.response.data);
    }
  }
);

const login = createAsyncThunk(
  "[AUTH] LOGIN",
  async ({ email, password }: LoginInfo, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = await requestAuth.login(email, password);

      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(error.response.data);
    }
  }
);

const signup = createAsyncThunk(
  "[AUTH] SIGNUP",
  async (
    { email, password, age }: SignupInfo,
    { dispatch, rejectWithValue }
  ) => {
    try {
      await requestAuth.signup(email, password, age);
      dispatch(login({ email, password }));
    } catch (error) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(error.response.data);
    }
  }
);

export const action = {
  checkAccessToken,
  login,
  signup,
  logout,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        console.log("!!!!!!!!!!!!");
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

export default authSlice.reducer;
