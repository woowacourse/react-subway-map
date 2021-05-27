import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  SIGNUP_SUCCEED,
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

      if (response.status === SIGNUP_SUCCEED.CODE) {
        return;
      }

      const { message } = await response.json();

      // eslint-disable-next-line consistent-return
      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      // eslint-disable-next-line consistent-return
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
    [signup.fulfilled]: (state) => {
      state.status = STATUS.SUCCEED;
      state.message = SIGNUP_SUCCEED.MESSAGE;
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
