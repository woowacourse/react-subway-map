import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const login = createAsyncThunk('user/login', async ({ endpoint, email, password }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/login/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await response.json();

    if (response.status === 200) {
      return { ...body, email };
    }

    throw new Error(body.message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const loginByToken = createAsyncThunk('user/loginByToken', async ({ endpoint, accessToken }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/members/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const body = await response.json();

    if (response.status === 200) {
      return { email: body.email, accessToken };
    }

    throw new Error(body.message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    accessToken: null,
    isLogin: false,
    isLoginFail: false,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.email = null;
      state.accessToken = null;
      state.isLogin = false;
      state.isLogout = true;
    },
    clearLoginFail: (state) => {
      state.isLoginFail = false;
    },
    clearLogout: (state) => {
      state.isLogout = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { email, accessToken } = action.payload;

      state.email = email;
      state.accessToken = accessToken;
      state.isLogin = true;
      state.isLoading = false;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.rejected]: (state) => {
      state.isLoginFail = true;
      state.isLoading = false;
    },
    [loginByToken.fulfilled]: (state, action) => {
      const { email, accessToken } = action.payload;

      state.email = email;
      state.accessToken = accessToken;
      state.isLogin = true;
      state.isLoading = false;
    },
    [loginByToken.pending]: (state) => {
      state.isLoading = true;
    },
    [loginByToken.rejected]: (state) => {
      state.isLoginFail = true;
      state.isLoading = false;
    },
  },
});

export { login, loginByToken };
export const { logout, clearLoginFail, clearLogout } = userSlice.actions;

export default userSlice.reducer;
