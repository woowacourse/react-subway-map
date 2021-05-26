import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';
import { ApiStatus, CREWS } from '../types';

interface LoginError {
  message: string;
  status: number;
}

interface LoginData {
  accessToken: string;
  server: CREWS;
}

interface LoginAttributes {
  server: CREWS;
  form: {
    email: string;
    password: string;
  };
}

export interface AuthState {
  status: ApiStatus;
  accessToken: string;
  server: CREWS;
  isLogin: boolean;
  error: LoginError | null;
}

const persistAccessToken = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
const persistServer = window.localStorage.getItem(LOCAL_STORAGE_KEYS.SERVER) as CREWS;

const initialState: AuthState = {
  status: ApiStatus.IDLE,
  accessToken: persistAccessToken || '',
  server: persistServer || CREWS.DANYEE,
  isLogin: !!persistAccessToken && !!persistServer,
  error: null,
};

export const requestLogin = createAsyncThunk<
  LoginData,
  LoginAttributes,
  {
    rejectValue: LoginError;
  }
>('auth/requestLogin', async (loginData: LoginAttributes, { rejectWithValue }) => {
  const { server, form } = loginData;

  try {
    const response = await API[server].post('/login', form);

    return { accessToken: response.data.accessToken, server };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.accessToken = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestLogin.pending, (state) => {
      state.status = ApiStatus.PENDING;
      state.accessToken = '';
      state.isLogin = false;
      state.error = null;
    });
    builder.addCase(requestLogin.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.accessToken = payload.accessToken;
      state.server = payload.server;
      state.isLogin = true;
      state.error = null;
    });
    builder.addCase(requestLogin.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.accessToken = '';
      state.isLogin = false;
      state.error = payload as LoginError;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
