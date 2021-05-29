import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInRequest } from '../../interfaces';

export interface SelectServerPayload {
  serverName: string;
  baseURL: string;
}
export interface LoginPayload {
  email: SignInRequest['email'];
  accessToken: string;
}
export interface ErrorPayload {
  error: string;
}

interface UserState {
  serverName: string;
  baseURL: string;
  email: string;
  accessToken: string;
  error: string;
}

const initialState = {
  serverName: '',
  baseURL: '',
  email: '',
  accessToken: '',
  error: '',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectServer: (state, action: PayloadAction<SelectServerPayload>) => {
      state.serverName = action.payload.serverName;
      state.baseURL = action.payload.baseURL;
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },

    loginAsync: (state, action: PayloadAction<SignInRequest>) => {},
    error: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload.error;
    },
    resetError: state => {
      state.error = '';
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type UserAction = ReturnType<
  | typeof userSlice.actions.selectServer
  | typeof userSlice.actions.login
  | typeof userSlice.actions.loginAsync
  | typeof userSlice.actions.error
  | typeof userSlice.actions.resetError
  | typeof userSlice.actions.pending
>;

export const { selectServer, login, loginAsync, error, resetError, pending } = userSlice.actions;
export default userSlice.reducer;
