import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../utils';
import { Nullable, ILoginRes, ILoginReq } from '../type';
import { IResMeta } from '../type';

export type IAccessToken = Nullable<ILoginRes & IResMeta>;

export const initialState: IAccessToken = {
  accessToken: null,

  isError: null,
  message: null,
};

export const loginRequestAsync = createAsyncThunk(
  `loginRequest`,
  async (loginReq: { host: string; body: ILoginReq }, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    try {
      thunkAPI.dispatch(setAccessToken({ isError: null }));
      const response = await request.post(`${loginReq.host}/login/token`, headers, loginReq.body);

      return response;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue({
        isError: true,
        message: error.response.data.message,
      });
    }
  },
);

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken: (state = initialState, { payload }) => {
      state.accessToken = payload.accessToken;

      state.message = payload.message;
      state.isError = payload.isError;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginRequestAsync.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;

      state.message = '';
      state.isError = false;
    });

    builder.addCase(loginRequestAsync.rejected, (state, { payload }) => {
      state.accessToken = null;

      state.isError = true;
      state.message = (payload as IResMeta).message;
    });
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice;
