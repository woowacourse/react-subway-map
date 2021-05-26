import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getLines = createAsyncThunk('line/getLines', async ({ endpoint }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/lines`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
  async ({ endpoint, name, upStation, downStation, distance, color }, thunkAPI) => {
    try {
      const response = await fetch(`${endpoint}/lines`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          upStation,
          downStation,
          distance,
          color,
        }),
      });

      const body = await response.json();

      if (response.status === 201) {
        return body;
      } else {
        throw new Error(body);
      }
    } catch (e) {
      console.error(e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const removeLine = createAsyncThunk('line/removeLine', async ({ endpoint, id }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/lines/${id}`, {
      method: 'DELETE',
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
      const { id, name } = action.payload;

      state.lines = [{ id, name }, ...state.lines];
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
export const { clearAddSuccess } = lineSlice.actions;

export default lineSlice.reducer;
