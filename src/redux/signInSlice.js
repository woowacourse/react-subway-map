import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, { payload: { token } }) => {
      state.token = token;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { setToken, clearToken } = userSlice.actions;
