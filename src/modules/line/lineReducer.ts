import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddLineRequest, Line } from '../../interfaces';

export type SetLinePayload = Line[];

export type AddLinePayload = AddLineRequest;

export type DeleteLinePayload = Line['id'];

export type ErrorPayload = string;

export interface LineState {
  lines: Line[];
  error: string | null;
}

const initialState = {
  lines: [],
  error: null,
} as LineState;

export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    setLines: (state, action: PayloadAction<SetLinePayload>) => {
      state.lines = action.payload.sort((a, b) => b.id - a.id);
    },
    getLinesAsync: () => {},
    addLineAsync: (state, action: PayloadAction<AddLinePayload>) => {},
    deleteLineAsync: (state, action: PayloadAction<DeleteLinePayload>) => {},
    error: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
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
