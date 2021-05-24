import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

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

interface UserState {
  serverName: string;
  baseURL: string;
  email: string;
  accessToken: string;
}

const initialState = {
  serverName: '',
  baseURL: '',
  email: '',
  accessToken: '',
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
    loginAsync: (state, action: PayloadAction<LoginAsyncAction>) => {
      if (current(state).accessToken === '') {
        throw new Error('로그인에 실패하였습니다.\n잠시 후 다시 시도해주세요.');
      }
    },
  },
});

export type userAction = ReturnType<
  typeof userSlice.actions.selectServer | typeof userSlice.actions.login | typeof userSlice.actions.logout
>;

export const { selectServer, login, loginAsync, logout } = userSlice.actions;
export default userSlice.reducer;
