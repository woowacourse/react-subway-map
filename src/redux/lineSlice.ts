import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AddLineRequestData,
  ModifyLineRequestData,
  requestAddLine,
  requestDeleteLine,
  requestGetLines,
  requestModifyLine,
} from '../api/lines';
import { Line } from '../types';

export interface AddLineData {
  baseURL: string;
  addLineRequestData: AddLineRequestData;
}

export interface DeleteLineData {
  baseURL: string;
  lineId: number;
}

export interface ModifyLineData {
  baseURL: string;
  modifyLineRequestData: ModifyLineRequestData;
}

export const loadLines = createAsyncThunk(
  'line/load',
  async (baseURL: string, { rejectWithValue }) => {
    try {
      const response = await requestGetLines(baseURL);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addLine = createAsyncThunk(
  'line/add',
  async ({ baseURL, addLineRequestData }: AddLineData, { rejectWithValue }) => {
    try {
      const response = await requestAddLine(baseURL, addLineRequestData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLine = createAsyncThunk(
  'line/delete',
  async ({ baseURL, lineId }: DeleteLineData, { rejectWithValue }) => {
    try {
      await requestDeleteLine(baseURL, lineId);

      return lineId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const modifyLine = createAsyncThunk(
  'line/modify',
  async ({ baseURL, modifyLineRequestData }: ModifyLineData, { rejectWithValue }) => {
    try {
      await requestModifyLine(baseURL, modifyLineRequestData);

      return modifyLineRequestData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  lines: [] as Line[],
};

const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    clearLines: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadLines.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(loadLines.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lines = action.payload;
    });
    builder.addCase(loadLines.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });

    builder.addCase(addLine.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(addLine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lines = [...state.lines, action.payload] as Line[];
    });
    builder.addCase(addLine.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });

    builder.addCase(deleteLine.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(deleteLine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lines = state.lines.filter((line) => line.id !== action.payload);
    });
    builder.addCase(deleteLine.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });

    builder.addCase(modifyLine.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(modifyLine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lines = state.lines.map((line) =>
        line.id === action.payload.lineId
          ? { ...line, name: action.payload.name, color: action.payload.color }
          : line
      );
    });
    builder.addCase(modifyLine.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });
  },
});

export const { clearLines } = lineSlice.actions;

export default lineSlice.reducer;
