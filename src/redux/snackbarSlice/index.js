import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    message: null,
  },
  reducers: {
    setMessage: (state, { payload: { message } }) => {
      state.message = message;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

const snackbarReducer = snackbarSlice.reducer;

export default snackbarReducer;

export const { setMessage, clearMessage } = snackbarSlice.actions;
