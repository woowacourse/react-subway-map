import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Line, LineAddRequestItem, SectionAddRequestItem } from "../@types/types";
import { requestLine } from "../apis/line";
import { requestSection } from "../apis/section";

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

const addLine = createAsyncThunk("[LINE] ADD", async (lineRequestItem: LineAddRequestItem) => {
  const line = await requestLine.addLine(lineRequestItem);

  return line;
});

const deleteLine = createAsyncThunk("[LINE] DELETE", async (id: number) => {
  await requestLine.deleteLine(id);

  return id;
});

const addSection = createAsyncThunk("[LINE] SECTION_ADD", async (sectionAddRequestItem: SectionAddRequestItem) => {
  const response = await requestSection.addSection(sectionAddRequestItem);

  return response.data;
});

const deleteSection = createAsyncThunk(
  "[LINE] SECTION_DELETE",
  async ({ lineId, stationId }: { lineId: number; stationId: number }) => {
    await requestSection.deleteSection({ lineId, stationId });

    return {
      lineId,
      stationId,
    };
  }
);

export const action = {
  getLines,
  addLine,
  deleteLine,
  addSection,
  deleteSection,
};

// Builder 를 통해 payload 타입 추론이 가능하도록 고치기

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
    [addLine.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [addLine.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteLine.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteLine.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteLine.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [addSection.pending.type]: (state) => {
      state.loading = true;
    },
    [addSection.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [addSection.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteSection.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteSection.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteSection.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default lineSlice.reducer;
