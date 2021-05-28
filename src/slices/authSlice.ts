import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';
import BACKEND from '../constants/backend';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';
import { ApiStatus, CREWS, Error } from '../types';
import { resetLine } from './lineSlice';
import { resetStation } from './stationSlice';

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
  error: Error | null;
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
    rejectValue: Error;
  }
>('auth/requestLogin', async (loginData: LoginAttributes, { rejectWithValue, dispatch }) => {
  const { server, form } = loginData;
  API.defaults.baseURL = BACKEND[server].baseUrl;

  try {
    const response = await API.post('/login', form);
    const { accessToken } = response.data;

    API.defaults.headers.post.Authorization = `Bearer ${accessToken}`;
    API.defaults.headers.put.Authorization = `Bearer ${accessToken}`;
    API.defaults.headers.delete.Authorization = `Bearer ${accessToken}`;

    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.SERVER, server);

    dispatch(resetStation());
    dispatch(resetLine());

    return { accessToken, server };
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

      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, '');
    },
    resetError: (state) => {
      state.error = null;
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
      state.error = payload as Error;
    });
  },
});

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
