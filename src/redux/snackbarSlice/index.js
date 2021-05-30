import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbar: { message: null },
  },
  reducers: {
    setMessage: (state, { payload: { message } }) => {
      state.snackbar = { message };
    },
    clearMessage: (state) => {
      state.snackbar = { message: null };
    },
  },
});

const snackbarReducer = snackbarSlice.reducer;

export default snackbarReducer;

export const { setMessage, clearMessage } = snackbarSlice.actions;
