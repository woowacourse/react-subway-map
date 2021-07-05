import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { ENDPOINT, MESSAGE, RESPONSE_CODE } from "../../api/constants";
import http from "../../api/http";

export const selectSignupStatus = (state) => state.signup.status;
export const selectSignupMessage = (state) => state.signup.message;

export const signup = createAsyncThunk(
  "signup/signup",
  async ({ email, password, age }, { rejectWithValue }) => {
    try {
      const response = await http.post(ENDPOINT.SIGNUP, {
        body: { email, password, age },
      });

      if (response.status === RESPONSE_CODE.CREATE) {
        return;
      }

      const { message } = await response.json();

      // eslint-disable-next-line consistent-return
      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      // eslint-disable-next-line consistent-return
      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
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
      state.message = MESSAGE.SIGNUP_SUCCEED;
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
