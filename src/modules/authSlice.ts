import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RESPONSE_STATE, END_POINT } from '../constants';
import { User } from 'types';
import { AppDispatch, RootState } from './hooks';

export interface AuthState {
  data?: User;
  state: RESPONSE_STATE;
}

const initialState: AuthState = {
  data: undefined,
  state: RESPONSE_STATE.IDLE,
};

export const requestGetUser = createAsyncThunk<
  { user: User },
  string,
  { dispatch: AppDispatch; state: RootState }
>('auth/getUser', async (accessToken, { rejectWithValue, getState }) => {
  const BASE_URL = getState().serverSlice.server;

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
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = undefined;
      state.state = RESPONSE_STATE.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      requestGetUser.fulfilled.type,
      (state, action: PayloadAction<{ user: User }>) => {
        state.data = action.payload.user;
        state.state = RESPONSE_STATE.FULFILLED;
      },
    );
    builder.addCase(requestGetUser.rejected, (state) => {
      state.data = undefined;
      state.state = RESPONSE_STATE.REJECTED;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
