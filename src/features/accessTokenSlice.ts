import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../utils';
import { Nullable, ILoginRes, ILoginReq } from '../type';
import { IResMeta } from '../hooks/useServerAPI';

export type IAccessToken = Nullable<ILoginRes & IResMeta>;

const initialState: IAccessToken = {
  accessToken: null,

  isError: null,
  text: null,
  status: null,
};

export const loginRequestAsync = createAsyncThunk(
  `loginRequest`,
  async (loginReqBody: ILoginReq, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    try {
      const response = await request.post('/login/token', headers, loginReqBody);

      return response;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue({
        isError: true,
        text: '로그인에 실패하였습니다.',
        status: error.response.status,
      });
    }
  },
);

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken: (state = initialState, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginRequestAsync.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;

      state.status = payload.status;
      state.text = '';
      state.isError = false;
    });

    builder.addCase(loginRequestAsync.rejected, (state, { payload }) => {
      state.accessToken = null;

      state.isError = true;
      state.status = (payload as IResMeta).status;
      state.text = (payload as IResMeta).text;
    });
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice;
