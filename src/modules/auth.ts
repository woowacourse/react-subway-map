import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAllOf,
  AnyAction,
  createAction,
} from "@reduxjs/toolkit";

import { auth } from "../apis";

import {
  isPendingAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";
import { LoginInfo, SignupInfo } from "../@types";
import { ERROR_DURATION } from "../constants";

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

    const response = await auth.getUserInfo(accessToken);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }
  }
);

const login = createAsyncThunk(
  "[AUTH] LOGIN",
  async ({ email, password }: LoginInfo, { dispatch, rejectWithValue }) => {
    const response = await auth.login(email, password);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    localStorage.setItem("accessToken", response.result.accessToken);

    return response.result;
  }
);

const signup = createAsyncThunk(
  "[AUTH] SIGNUP",
  async (
    { email, password, age }: SignupInfo,
    { dispatch, rejectWithValue }
  ) => {
    const response = await auth.signup(email, password, age);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    dispatch(login({ email, password }));

    return response.result;
  }
);

const action = {
  checkAccessToken,
  login,
  signup,
  logout,
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

export default authSlice.reducer;
export { action, authSlice };
