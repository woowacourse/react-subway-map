import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { request } from '../services/httpRequest';

const fetchLines = createAsyncThunk('line/fetchLines', async (_, thunkAPI) => {
  try {
    const response = await request.get('/lines');

    if (response.status === 200) {
      return { lines: response.data };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const addLine = createAsyncThunk(
  'line/addLine',
  async ({ name, upStationId, downStationId, distance, color }, thunkAPI) => {
    try {
      const response = await request.post('/lines', { name, upStationId, downStationId, distance, color });

      if (response.status === 201) {
        const [startStation, endStation] = response.data.stations;

        return {
          id: response.data.id,
          name,
          startStation,
          endStation,
          distance,
          color,
        };
      }
    } catch (e) {
      const { error } = e.response.data;
      console.error(error);

      return thunkAPI.rejectWithValue(error);
    }
  },
);

const removeLine = createAsyncThunk('line/removeLine', async ({ id }, thunkAPI) => {
  try {
    const response = await request.delete(`/lines/${id}`);

    if (response.status === 204) {
      return { id };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const lineSlice = createSlice({
  name: 'line',
  initialState: {
    lines: [],
    isLoading: false,
    error: '',
  },
  reducers: {
    clearLine: (state) => {
      state.lines = [];
    },
    clearLineState: (state) => {
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchLines.fulfilled]: (state, action) => {
      const { lines } = action.payload;

      state.lines = lines;
    },
    [fetchLines.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLines.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [addLine.fulfilled]: (state, action) => {
      const line = action.payload;

      state.lines = [line, ...state.lines];
    },
    [addLine.pending]: (state) => {
      state.isLoading = true;
    },
    [addLine.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [removeLine.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.lines = state.lines.filter((line) => line.id !== id);
    },
    [removeLine.pending]: (state) => {
      state.isLoading = true;
    },
    [removeLine.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export { addLine, fetchLines, removeLine };
export const { clearLine, clearLineState } = lineSlice.actions;

export default lineSlice.reducer;
