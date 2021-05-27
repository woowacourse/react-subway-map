import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServerState {
  server: string;
}

const initialState: ServerState = {
  server: '',
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    selectServer: (state, action: PayloadAction<{ server: string }>) => {
      state.server = action.payload.server;
    },
    resetServer: (state) => {
      state.server = '';
    },
  },
});

export const { selectServer, resetServer } = serverSlice.actions;

export default serverSlice.reducer;
