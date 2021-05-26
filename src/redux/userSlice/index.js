import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERROR } from '../../constants';
import { request } from '../../utils';

export const getUserTokenThunk = createAsyncThunk(
  'user/getUserTokenThunk',
  async ({ params }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.post('/login/token', params);

      if (response.status !== 200) {
        return rejectWithValue({
          error: '이메일 혹은 비밀번호를 다시 확인해주세요.',
        });
      }

      return { token: response.data.accessToken };
    } catch (error) {
      console.error(error);

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
