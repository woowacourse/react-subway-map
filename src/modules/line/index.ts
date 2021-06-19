import { createSlice, isAllOf, PayloadAction } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../@shared/checkThunkActionStatus";

import {
  getLines,
  addLine,
  deleteLine,
  addSection,
  deleteSection,
  resetError,
} from "./thunks";
import { isLineAction, LineState } from "./types";

const initialState: LineState = {
  items: [],
  loading: false,
  error: null,
};

const lineSlice = createSlice({
  name: "line",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLines.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(resetError, (state) => {
        state.error = null;
      })
      .addMatcher(isAllOf(isLineAction, isFulfilledAction), (state) => {
        state.loading = false;
      })
      .addMatcher(isAllOf(isLineAction, isPendingAction), (state) => {
        state.loading = true;
      })
      .addMatcher(
        isAllOf(isLineAction, isRejectedAction),
        (state, { payload }: PayloadAction<Error>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

const action = {
  getLines,
  addLine,
  deleteLine,
  addSection,
  deleteSection,
  resetError,
};

export default lineSlice.reducer;
export { lineSlice };
export { action };
