import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IResMeta } from '../hooks/useServerAPI';
import { IMyInfoRes, Nullable } from '../type';
import { request } from '../utils';

export type ISignedUser = Nullable<IMyInfoRes & IResMeta>;

export const initialState: ISignedUser = {
  id: null,
  email: null,
  age: null,

  isError: null,
  message: null,
};
export const getSignedUserAsync = createAsyncThunk(
  `getSignedUser`,
  async (getSignedUserReq: { host: string; accessToken: string | null }, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getSignedUserReq.accessToken}`,
    };

    // TODO: /members/me 상수화, 에러 메시지 요청
    try {
      thunkAPI.dispatch(setSignedUser({ isError: null }));
      const response = await request.get(`${getSignedUserReq.host}/members/me`, headers);

      return response;
    } catch (error) {
      console.error(error.response);

      return thunkAPI.rejectWithValue({
        isError: true,
        message: error.response.message,
      });
    }
  },
);

const signedUserSlice = createSlice({
  name: 'signedUser',
  initialState,
  reducers: {
    setSignedUser: (state = initialState, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.age = payload.age;
      state.isError = payload.isError;
      state.message = payload.message;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSignedUserAsync.fulfilled, (state, { payload }) => {
      state.id = payload.data.id;
      state.email = payload.data.email;
      state.age = payload.data.age;

      state.message = '';
      state.isError = false;
    });
    builder.addCase(getSignedUserAsync.rejected, (state, { payload }) => {
      state.id = null;
      state.email = null;
      state.age = null;

      state.isError = true;
state.message = (payload as IResMeta).message;
    });
  },
});

export const { setSignedUser } = signedUserSlice.actions;

export default signedUserSlice;
