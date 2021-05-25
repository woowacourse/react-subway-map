import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../utils';
import { Nullable, ILoginRes, ILoginReq } from '../type';
import { IResMeta } from '../hooks/useServerAPI';

export type IAccessToken = Nullable<ILoginRes & IResMeta>;

const initialState: IAccessToken = {
  accessToken: null,

  isError: null,
  status: null,
};

export const loginRequestAsync = createAsyncThunk(
  `loginRequest`,
  async (loginReqBody: ILoginReq, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    try {
      thunkAPI.dispatch(setAccessToken({ isError: null }));
      const response = await request.post('/login/token', headers, loginReqBody);

      return response;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue({
        isError: true,
        status: error.response.status,
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

      state.status = payload.status;
      state.isError = payload.isError;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginRequestAsync.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;

      state.status = payload.status;
      state.isError = false;
    });

    builder.addCase(loginRequestAsync.rejected, (state, { payload }) => {
      state.accessToken = null;

      state.isError = true;
      state.status = (payload as IResMeta).status;
    });
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice;
