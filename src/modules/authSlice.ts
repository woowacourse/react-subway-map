import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_STATUS, BASE_URL, END_POINT } from 'constants/api';
import { User } from 'types';
import { AppDispatch } from './hooks';

export interface AuthState {
  data: User | undefined;
  status: API_STATUS;
}

const initialState: AuthState = {
  data: undefined,
  status: API_STATUS.IDLE,
};

export const requestGetUser = createAsyncThunk<{ user: User }, string, { dispatch: AppDispatch }>(
  'auth/getUser',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${END_POINT.AUTH}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { user: response.data };
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = undefined;
      state.status = API_STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      requestGetUser.fulfilled.type,
      (state, action: PayloadAction<{ user: User }>) => {
        state.data = action.payload.user;
        state.status = API_STATUS.FULFILLED;
      },
    );
    builder.addCase(requestGetUser.rejected, (state) => {
      state.data = undefined;
      state.status = API_STATUS.REJECTED;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
