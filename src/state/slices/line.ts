import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INVALID_VALUE } from '../../constants/validate';
import { LineId } from '../../types';

interface LineState {
  currentLineId: LineId;
  shouldUpdate: boolean;
}

const name = 'line';

const initialState: LineState = {
  currentLineId: INVALID_VALUE,
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
      state.currentLineId = INVALID_VALUE;
    },
    setShouldUpdate: (state) => {
      state.shouldUpdate = !state.shouldUpdate;
    },
  },
});

export const { actions: lineAction } = lineSlice;

export default lineSlice.reducer;
