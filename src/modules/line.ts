import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Line, LineRequestItem } from "../@types/types";
import { requestLine } from "../apis/line";

interface LineState {
  items: Line[];
  loading: boolean;
  error: Error | null;
}

const initialState: LineState = {
  items: [],
  loading: false,
  error: null,
};

const getLines = createAsyncThunk("[LINE] LOAD", async () => {
  const line = await requestLine.getAllLines();

  return line;
});

const addLine = createAsyncThunk("[LINE] ADD", async (lineRequestItem: LineRequestItem) => {
  const line = await requestLine.addLine(lineRequestItem);

  return line;
});

const deleteLine = createAsyncThunk("[LINE] DELETE", async (id: number) => {
  await requestLine.deleteLine(id);

  return id;
});

export const action = {
  getLines,
  addLine,
  deleteLine,
};

export const lineSlice = createSlice({
  name: "line",
  initialState,
  reducers: {},
  extraReducers: {
    [getLines.pending.type]: (state) => {
      state.loading = true;
    },
    [getLines.fulfilled.type]: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    },
    [getLines.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [addLine.pending.type]: (state) => {
      state.loading = true;
    },
    [addLine.fulfilled.type]: (state, { payload }) => {
      state.items.push(payload);
      state.loading = false;
    },
    [addLine.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteLine.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteLine.fulfilled.type]: (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
      state.loading = false;
    },
    [deleteLine.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default lineSlice.reducer;
