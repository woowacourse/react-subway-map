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

const getLines = createAsyncThunk("[LINE] LOAD", async (_, { rejectWithValue }) => {
  try {
    const line = await requestLine.getAllLines();

    return line;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const addLine = createAsyncThunk("[LINE] ADD", async (lineRequestItem: LineAddRequestItem, { rejectWithValue }) => {
  try {
    const line = await requestLine.addLine(lineRequestItem);

    return line;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const deleteLine = createAsyncThunk("[LINE] DELETE", async (id: number, { rejectWithValue }) => {
  try {
    await requestLine.deleteLine(id);

    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const addSection = createAsyncThunk(
  "[LINE] SECTION_ADD",
  async (sectionAddRequestItem: SectionAddRequestItem, { rejectWithValue }) => {
    try {
      const response = await requestSection.addSection(sectionAddRequestItem);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteSection = createAsyncThunk(
  "[LINE] SECTION_DELETE",
  async ({ lineId, stationId }: { lineId: number; stationId: number }, { rejectWithValue }) => {
    try {
      await requestSection.deleteSection({ lineId, stationId });

      return {
        lineId,
        stationId,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
      state.error = null;
    },
    [getLines.fulfilled.type]: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
      state.error = null;
    },
    [getLines.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [addLine.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addLine.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [addLine.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteLine.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteLine.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [deleteLine.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [addSection.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addSection.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [addSection.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteSection.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteSection.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [deleteSection.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default lineSlice.reducer;
