import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AddLineRequestData,
  ModifyLineRequestData,
  requestAddLine,
  requestDeleteLine,
  requestGetLines,
  requestModifyLine
} from '../api/lines';
import { Line } from '../types';

export const loadLines = createAsyncThunk('line/load', async (_, { rejectWithValue }) => {
  try {
    const response = await requestGetLines();

    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addLine = createAsyncThunk(
  'line/add',
  async (addLineRequestData: AddLineRequestData, { rejectWithValue }) => {
    try {
      const response = await requestAddLine(addLineRequestData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLine = createAsyncThunk(
  'line/delete',
  async (lineId: number, { rejectWithValue }) => {
    try {
      await requestDeleteLine(lineId);

      return lineId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const modifyLine = createAsyncThunk(
  'line/modify',
  async (modifyLineRequestData: ModifyLineRequestData, { rejectWithValue }) => {
    try {
      await requestModifyLine(modifyLineRequestData);

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
