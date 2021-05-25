import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IResMeta } from '../hooks/useServerAPI';
import { IMyInfoRes, Nullable } from '../type';
import { request } from '../utils';

export type ISignedUser = Nullable<IMyInfoRes & IResMeta>;

const initialState: ISignedUser = {
  id: null,
  email: null,
  age: null,

  isError: null,
  text: null,
  status: null,
};

export const getSignedUserAsync = createAsyncThunk(
  `getSignedUser`,
  async (accessToken: string | null, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };

    // TODO: /members/me 상수화, 에러 메시지 요청
    // TODO: text가 필요한가?
    try {
      const response = await request.get('/members/me', headers);

      return response;
    } catch (error) {
      console.error(error.response);

      return thunkAPI.rejectWithValue({
        isError: true,
        text: '회원 정보를 불러오는데 실패하였습니다.',
        status: error.response.status,
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
      state.text = payload.text;
      state.status = payload.status;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSignedUserAsync.fulfilled, (state, { payload }) => {
      state.id = payload.data.id;
      state.email = payload.data.email;
      state.age = payload.data.age;

      state.status = payload.status;
      state.text = '';
      state.isError = false;
    });
    builder.addCase(getSignedUserAsync.rejected, (state, { payload }) => {
      state.id = null;
      state.email = null;
      state.age = null;

      state.isError = true;
      state.status = (payload as IResMeta).status;
      state.text = (payload as IResMeta).text;
    });
  },
});

export const { setSignedUser } = signedUserSlice.actions;

export default signedUserSlice;
