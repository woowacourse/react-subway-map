import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  serverName?: string;
  baseURL?: string;
  email?: string;
}

const initialState = {
  serverName: '',
  baseURL: '',
  email: '',
} as LoginState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectServer: (state, action: PayloadAction<LoginState>) => {
      state.serverName = action.payload.serverName;
      state.baseURL = action.payload.baseURL;
    },
    login: (state, action: PayloadAction<LoginState>) => {
      state.email = action.payload.email;
    },
    logout: () => initialState,
  },
});

export const { selectServer, login, logout } = userSlice.actions;
export default userSlice.reducer;
