import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { ENDPOINT, MESSAGE, RESPONSE_CODE } from "../../api/constants";
import http from "../../api/http";
import {
  getSavedAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "./localStorage";

export const selectAccessToken = (state) => state.login.accessToken;
export const selectLoginStatus = (state) => state.login.status;
export const selectLoginMessage = (state) => state.login.message;

export const login = createAsyncThunk(
  "login/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await http.post(ENDPOINT.LOGIN, {
        body: { email, password },
      });

      const { accessToken, message } = await response.json();

      if (response.status === RESPONSE_CODE.LOGIN) {
        saveAccessToken(accessToken);

        return accessToken;
      }

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
    }
  }
);

export const logout = () => {
  removeAccessToken();

  return { type: "login/logout" };
};

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
    reset: (state) => {
      state.status = STATUS.IDLE;
      state.message = "";
      state.error = null;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [login.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = MESSAGE.LOGIN_SUCCEED;
      state.accessToken = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.message = action.payload;
      state.error = action.error;
    },
  },
});

export const { reset } = loginSlice.actions;

export default loginSlice.reducer;
