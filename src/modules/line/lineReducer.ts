import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddLineAction, DeleteLineAction, ErrorAction, LineState, SetLineAction } from '../../interfaces/line';

const initialState: LineState = {
  lines: [],
  error: '',
};

export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    pending: state => {
      state.error = '';
    },
    error: (state, action: PayloadAction<ErrorAction['payload']>) => {
      state.error = action.payload.error;
    },
    resetError: state => {
      state.error = '';
    },
    setLines: (state, action: PayloadAction<SetLineAction['payload']>) => {
      state.lines = action.payload.lines.sort((a, b) => b.id - a.id);
    },
    getLinesAsync: () => {},
    addLineAsync: (state, action: PayloadAction<AddLineAction['payload']>) => {},
    deleteLineAsync: (state, action: PayloadAction<DeleteLineAction['payload']>) => {},
  },
});

export type LineActions = ReturnType<
  | typeof lineSlice.actions.pending
  | typeof lineSlice.actions.error
  | typeof lineSlice.actions.resetError
  | typeof lineSlice.actions.setLines
  | typeof lineSlice.actions.getLinesAsync
  | typeof lineSlice.actions.addLineAsync
  | typeof lineSlice.actions.deleteLineAsync
>;

export const { setLines, getLinesAsync, addLineAsync, deleteLineAsync, error, resetError, pending } = lineSlice.actions;
export default lineSlice.reducer;
