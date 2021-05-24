import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { request } from '../utils';
import { Nullable, ILoginRes, IMyInfoRes, ILoginReq } from '../type';

export type ISignedUser = Nullable<IMyInfoRes & ILoginRes>;

const initialState = {
  id: null,
  email: null,
  age: null,
  accessToken: null,
} as ISignedUser;

export const getSignedUserAsync = createAsyncThunk(
  `getSignedUser`,
  async (accessToken: string | null) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };

    // TODO: /members/me 상수화
    const payload = await request.get('/members/me', headers);

    return payload;
  },
);

export const loginRequestAsync = createAsyncThunk(
  `loginRequest`,
  async (loginReqBody: ILoginReq) => {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    const payload = await request.post('/login/token', headers, loginReqBody);

    return payload;
  },
);

export const signedUserSlice = createSlice({
  name: 'signedUser',
  initialState,
  reducers: {
    setSignedUser: (state = initialState, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.age = action.payload.age;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSignedUserAsync.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.email;
      state.age = payload.age;
    });
    builder.addCase(getSignedUserAsync.rejected, state => {
      state.id = null;
      state.email = null;
      state.age = null;
    });

    builder.addCase(loginRequestAsync.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
    });
    
    builder.addCase(loginRequestAsync.rejected, state => {
      state.accessToken = null;
    });
  },
});

export const { setSignedUser } = signedUserSlice.actions;

export const selectSignedUser = (state: RootState) => state.signedUser;

export default signedUserSlice.reducer;
