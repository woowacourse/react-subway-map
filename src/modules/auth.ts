import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { LoginInfo, SignupInfo } from "../@types/types";

import { requestAuth } from "../apis/user";

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

const logout = () => async (dispatch: Dispatch) => {
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
  extraReducers: {
    [checkAccessToken.fulfilled.type]: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    [checkAccessToken.rejected.type]: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    },
    [login.fulfilled.type]: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    [login.rejected.type]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.error = payload;
      state.loading = false;
    },
    [signup.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [LOGOUT]: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
