import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const login = createAsyncThunk('users/login', async ({ endpoint, email, password }, thunkAPI) => {
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
    } else {
      throw new Error(body);
    }
  } catch (e) {
    console.error(e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    accessToken: null,
    isLoginSuccess: false,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.email = null;
      state.accessToken = null;
      state.isLoginSuccess = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { email, accessToken } = action.payload;

      state.email = email;
      state.accessToken = accessToken;
      state.isLoginSuccess = true;
      state.isLoading = false;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export { login };
export const { logout } = userSlice.actions;

export default userSlice.reducer;
