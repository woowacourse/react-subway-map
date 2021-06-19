import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../services/httpRequest';

const getLines = createAsyncThunk('line/getLines', async (_, thunkAPI) => {
  try {
    const response = await request.get('/lines');

    if (response.status === 200) {
      return { lines: response.data };
    }
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
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
      console.error(e);
      return thunkAPI.rejectWithValue(e);
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

    console.error(e);
    return thunkAPI.rejectWithValue(error);
  }
});

const lineSlice = createSlice({
  name: 'line',
  initialState: {
    lines: [],
    isLoading: false,
    isAddSuccess: false,
    isAddFail: false,
    isDeleteSuccess: false,
    isDeleteFail: false,
  },
  reducers: {
    clearLineProgress: (state) => {
      state.isAddSuccess = false;
      state.isAddFail = false;
      state.isDeleteSuccess = false;
      state.isDeleteFail = false;
    },
    clearLine: (state) => {
      state.lines = [];
    },
  },
  extraReducers: {
    [getLines.fulfilled]: (state, action) => {
      const { lines } = action.payload;

      state.lines = lines;
    },
    [getLines.pending]: (state) => {
      state.isLoading = true;
    },
    [getLines.rejected]: (state) => {
      state.isLoading = false;
    },

    [addLine.fulfilled]: (state, action) => {
      const line = action.payload;

      state.lines = [line, ...state.lines];
      state.isAddSuccess = true;
    },
    [addLine.pending]: (state) => {
      state.isLoading = true;
    },
    [addLine.rejected]: (state) => {
      state.isAddFail = true;
      state.isLoading = false;
    },

    [removeLine.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.lines = state.lines.filter((line) => line.id !== id);
      state.isDeleteSuccess = true;
    },
    [removeLine.pending]: (state) => {
      state.isLoading = true;
    },
    [removeLine.rejected]: (state) => {
      state.isDeleteFail = true;
      state.isLoading = false;
    },
  },
});

export { getLines, addLine, removeLine };
export const { clearLineProgress, clearLine } = lineSlice.actions;

export default lineSlice.reducer;
