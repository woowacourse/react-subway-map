import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  LOGIN_SUCCEED,
  UNKNOWN_ERROR_MESSAGE,
} from "../../api/constants";
import http from "../../api/http";
import {
  getSavedAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "./localStorage";

export const selectAccessToken = (state) => state.login.accessToken;

export const login = createAsyncThunk(
  "login/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await http.post(ENDPOINT.LOGIN, {
        body: { email, password },
      });

      const { accessToken, message } = await response.json();

      if (response.status === LOGIN_SUCCEED.CODE) {
        return accessToken;
      }

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

const initialState = {
  status: STATUS.IDLE,
  accessToken: getSavedAccessToken(),
  message: "",
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => ({ ...initialState, accessToken: state.accessToken }),
    logout: (state) => {
      state.accessToken = null;

      removeAccessToken();
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [login.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = LOGIN_SUCCEED.MESSAGE;
      state.accessToken = action.payload;

      saveAccessToken(action.payload);
    },
    [login.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.message = action.payload;
      state.error = action.error;
    },
  },
});

export const { reset, logout } = loginSlice.actions;

export default loginSlice.reducer;
