import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignupPayload {
  email: string;
  password: string;
  age: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

// TODO: 추상화
export const signupAsync = createAsyncThunk('auth/signupAsync', async ({ email, password, age }: SignupPayload) => {
  try {
    await axios.post(`/members`, {
      email,
      password,
      age,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const loginAsync = createAsyncThunk('auth/loginAsync', async ({ email, password }: LoginPayload) => {
  try {
    const response = await axios.post(`/login/token`, {
      email,
      password,
    });

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState: { accessToken: string | null } = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupAsync.rejected, () => {
      throw Error('회원가입에 실패하였습니다.');
    });

    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
    builder.addCase(loginAsync.rejected, () => {
      throw Error('로그인에 실패하였습니다.');
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
