import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERROR, RESPONSE } from '../../constants';
import { request } from '../../utils';

export const getUserTokenThunk = createAsyncThunk(
  'user/getUserTokenThunk',
  async ({ params }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.post('/login/token', params);

      return { token: response.data.accessToken };
    } catch (error) {
      console.error(error);

      if (error.response.status === 401) {
        return rejectWithValue({ error: RESPONSE.SIGN_IN.FAIL });
      }

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    error: null,
  },
  reducers: {
    setUserToken: (state, { payload: { token } }) => {
      state.token = token;
    },
    clearUserToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: {
    [getUserTokenThunk.fulfilled]: (state, { payload: { token } }) => {
      state.token = token;
      state.error = null;
    },
    [getUserTokenThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },
  },
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { setUserToken, clearUserToken } = userSlice.actions;
