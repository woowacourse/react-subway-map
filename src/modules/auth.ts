import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestAuth } from "../apis/user";

const LOGIN = "auth/login";

interface LoginInfo {
  email: string;
  password: string;
}

interface AuthState {
  user: LoginInfo | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<string, LoginInfo>(LOGIN, async ({ email, password }) => {
  const accessToken = await requestAuth.login(email, password);

  return accessToken;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<LoginInfo>) => {
      state.loading = false;
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
