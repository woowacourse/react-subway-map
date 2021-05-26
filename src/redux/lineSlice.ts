import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestGetLines } from '../api/lines';
import { Line } from '../types';

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

const lineSlice = createSlice({
  name: 'line',
  initialState: {
    isLoading: false,
    errorMessage: '',
    lines: [] as Line[],
  },
  reducers: {},
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
  },
});

export default lineSlice.reducer;
