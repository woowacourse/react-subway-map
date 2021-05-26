import { createSlice } from '@reduxjs/toolkit';
import { HOST } from '../constants';

export const initialState = {
  host: HOST['인비'],
};

const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setHost: (state = initialState, { payload }) => {
      state.host = payload.host;
    },
  },
});

export const { setHost } = hostSlice.actions;

export default hostSlice;
