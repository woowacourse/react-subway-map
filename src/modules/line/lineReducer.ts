import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddLineRequest, Line } from '../../interfaces';

export interface SetLinePayload {
  lines: Line[];
}

export interface AddLinePayload {
  line: AddLineRequest;
}

export interface DeleteLinePayload {
  id: number;
}

export interface ErrorPayload {
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
    setLines: (state, action: PayloadAction<SetLinePayload>) => {
      state.lines = action.payload.lines.sort((a, b) => b.id - a.id);
    },
    getLinesAsync: () => {},
    addLineAsync: (state, action: PayloadAction<AddLinePayload>) => {},
    deleteLineAsync: (state, action: PayloadAction<DeleteLinePayload>) => {},
    error: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload.error;
    },
    resetError: state => {
      state.error = '';
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
  | typeof lineSlice.actions.deleteLineAsync
  | typeof lineSlice.actions.error
  | typeof lineSlice.actions.resetError
  | typeof lineSlice.actions.pending
>;

export const { setLines, getLinesAsync, addLineAsync, deleteLineAsync, error, resetError, pending } = lineSlice.actions;
export default lineSlice.reducer;
