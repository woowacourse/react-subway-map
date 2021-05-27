import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getLines = createAsyncThunk('line/getLines', async ({ endpoint, accessToken }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/lines`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const body = await response.json();

    if (response.status === 200) {
      return { lines: body };
    } else {
      throw new Error(body);
    }
  } catch (e) {
    console.error(e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const addLine = createAsyncThunk(
  'line/addLine',
  async ({ endpoint, accessToken, name, upStationId, downStationId, distance, color }, thunkAPI) => {
    try {
      const response = await fetch(`${endpoint}/lines`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          upStationId,
          downStationId,
          distance,
          color,
        }),
      });

      const body = await response.json();

      if (response.status === 201) {
        return {
          id: body.id,
          name,
          startStation: body.stations[0],
          endStation: body.stations[1],
          distance,
          color,
        };
      } else {
        throw new Error(body);
      }
    } catch (e) {
      console.error(e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const removeLine = createAsyncThunk('line/removeLine', async ({ endpoint, accessToken, id }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/lines/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204) {
      return { id };
    } else {
      throw new Error('삭제를 실패하였습니다.');
    }
  } catch (e) {
    console.error(e);
    thunkAPI.rejectWithValue(e);
  }
});

const lineSlice = createSlice({
  name: 'line',
  initialState: { lines: [], isLoading: false, isAddSuccess: false },
  reducers: {
    clearAddSuccess: (state) => {
      state.isAddSuccess = false;
    },
    clearLine: (state) => {
      state.lines = [];
      state.isLoading = false;
      state.isAddSuccess = false;
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
      state.isLoading = false;
    },
    [removeLine.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.lines = state.lines.filter((line) => line.id !== id);
    },
    [removeLine.pending]: (state) => {
      state.isLoading = true;
    },
    [removeLine.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export { getLines, addLine, removeLine };
export const { clearAddSuccess, clearLine } = lineSlice.actions;

export default lineSlice.reducer;
