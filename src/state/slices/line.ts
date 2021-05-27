import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LineId } from '../../types';

interface LineState {
  currentLineId: LineId;
  shouldUpdate: boolean;
}

const name = 'line';

const initialState: LineState = {
  currentLineId: -1,
  shouldUpdate: false,
};

const lineSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLineId: (state, action: PayloadAction<LineId>) => {
      state.currentLineId = action.payload;
    },
    initLineId: (state) => {
      state.currentLineId = -1;
    },
    setShouldUpdate: (state) => {
      state.shouldUpdate = !state.shouldUpdate;
    },
  },
});

export const { actions: lineAction } = lineSlice;

export default lineSlice.reducer;
