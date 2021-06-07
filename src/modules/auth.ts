import {
  createSlice,
  createAsyncThunk,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

import { requestAuth } from "../apis/user";
import { LoginInfo, SignupInfo } from "../@types/types";

import {
  isPendingAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";

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

const LOGOUT = "[AUTH] LOGOUT";

const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("accessToken");

  dispatch({
    type: LOGOUT,
  });
};

const checkAccessToken = createAsyncThunk(
  "[AUTH] CHECK_ACCESS_TOKEN",
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken") || "";

    try {
      await requestAuth.getUserInfo(accessToken);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const login = createAsyncThunk(
  "[AUTH] LOGIN",
  async ({ email, password }: LoginInfo, { rejectWithValue }) => {
    try {
      const accessToken = await requestAuth.login(email, password);

      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signup = createAsyncThunk(
  "[AUTH] SIGNUP",
  async (
    { email, password, age }: SignupInfo,
    { rejectWithValue, dispatch }
  ) => {
    try {
      await requestAuth.signup(email, password, age);
      dispatch(login({ email, password }));
    } catch (error) {
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
      .addCase(LOGOUT, (state) => {
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
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
      })
      .addMatcher(
        isRejectedAction,
        (state, { payload }: PayloadAction<Error>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default authSlice.reducer;
