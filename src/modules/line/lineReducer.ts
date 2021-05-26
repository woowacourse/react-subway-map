import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddLine, Line } from '../../interfaces';

interface SetLineAction {
  lines: Line[];
}

interface AddLineAction {
  line: AddLine;
}

export interface ErrorAction {
  error: string;
}

export interface LineState {
  lines: Line[];
  error: string;
}

const initialState = {
  lines: [],
  error: '',
} as LineState;

export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    setLines: (state, action: PayloadAction<SetLineAction>) => {
      state.lines = action.payload.lines.sort((a, b) => b.id - a.id);
    },
    getLinesAsync: () => {},
    addLineAsync: (state, action: PayloadAction<AddLineAction>) => {},
    error: (state, action: PayloadAction<ErrorAction>) => {
      state.error = action.payload.error;
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type LineActions = ReturnType<
  | typeof lineSlice.actions.setLines
  | typeof lineSlice.actions.getLinesAsync
  | typeof lineSlice.actions.addLineAsync
  | typeof lineSlice.actions.error
  | typeof lineSlice.actions.pending
>;

export const { setLines, getLinesAsync, addLineAsync, error, pending } = lineSlice.actions;
export default lineSlice.reducer;
