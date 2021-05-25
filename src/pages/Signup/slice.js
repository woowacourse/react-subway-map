import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  SIGNUP_STATUS_INFO,
  UNKNOWN_ERROR_MESSAGE,
} from "../../api/constants";
import http from "../../api/http";

export const signup = createAsyncThunk(
  "signup/signup",
  async ({ email, password, age }, { rejectWithValue }) => {
    try {
      const response = await http.post(ENDPOINT.SIGNUP, {
        body: { email, password, age },
      });

      if (response.status === 201) {
        return SIGNUP_STATUS_INFO[response.status].MESSAGE;
      }

      if (response.status in SIGNUP_STATUS_INFO) {
        return rejectWithValue(SIGNUP_STATUS_INFO[response.status].MESSAGE);
      }

      const body = await response.json();

      return rejectWithValue(body.message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

const initialState = {
  status: STATUS.IDLE,
  error: null,
  message: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [signup.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export const { reset } = signupSlice.actions;

export default signupSlice.reducer;
