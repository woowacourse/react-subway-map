import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    status: "idle",
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [signup.pending]: (state) => {
      state.status = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "succeed";
      state.message = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export default signupSlice.reducer;
