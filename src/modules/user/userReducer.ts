import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectServerAction {
  serverName: string;
  baseURL: string;
}
export interface LoginAction {
  email: string;
  accessToken: string;
}

export interface LoginAsyncAction {
  email: string;
  password: string;
}

export interface ErrorAction {
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
    selectServer: (state, action: PayloadAction<SelectServerAction>) => {
      state.serverName = action.payload.serverName;
      state.baseURL = action.payload.baseURL;
    },
    login: (state, action: PayloadAction<LoginAction>) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    logout: () => initialState,
    loginAsync: (state, action: PayloadAction<LoginAsyncAction>) => {},
    error: (state, action: PayloadAction<ErrorAction>) => {
      state.error = action.payload.error;
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type UserAction = ReturnType<
  | typeof userSlice.actions.selectServer
  | typeof userSlice.actions.login
  | typeof userSlice.actions.logout
  | typeof userSlice.actions.loginAsync
  | typeof userSlice.actions.error
  | typeof userSlice.actions.pending
>;

export const { selectServer, login, loginAsync, logout, error, pending } = userSlice.actions;
export default userSlice.reducer;
