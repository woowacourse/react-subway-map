import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'API/API';

interface SignupBodyType {
  email: string;
  password: string;
  age: number;
}

export const signupAsync = createAsyncThunk('auth/signupAsync', async ({ email, password, age }: SignupBodyType) => {
  try {
    await API.post('/members', {
      email,
      password,
      age,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const initialState: { accessToken: string } = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupAsync.rejected, () => {
      throw Error('회원가입에 실패하였습니다.');
    });
  },
});

export default authSlice.reducer;
