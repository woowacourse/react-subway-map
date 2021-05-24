import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  baseURL: string;
  email: string;
}

const initialState = {
  baseURL: '',
  email: '',
} as LoginState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginState>) => {
      state.baseURL = action.payload.baseURL;
      state.email = action.payload.email;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
