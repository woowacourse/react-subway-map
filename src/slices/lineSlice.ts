import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';
import { ApiStatus, Error, Line, LineAttribute } from '../types';

interface LineState {
  status: ApiStatus;
  list: Line[];
  error: Error | null;
}

const initialState: LineState = {
  status: ApiStatus.IDLE,
  list: [],
  error: null,
};

export const getLineList = createAsyncThunk('line/getLineList', async (_, { rejectWithValue }) => {
  try {
    const response = await API.get('/lines');

    const lineList: Line[] = response.data;

    return lineList;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addLine = createAsyncThunk(
  'line/addLine',
  async (newLine: LineAttribute, { rejectWithValue }) => {
    try {
      const response = await API.post('/lines', newLine);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editLine = createAsyncThunk(
  'line/editLine',
  async ({ id, name, color }: Line, { rejectWithValue }) => {
    try {
      const response = await API.put(`/lines/${id}`, { name, color });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLine = createAsyncThunk(
  'line/deleteLine',
  async (id: Line['id'], { rejectWithValue }) => {
    try {
      await API.delete(`/lines/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLineList.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(getLineList.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.list = payload;
      state.error = null;
    });
    builder.addCase(getLineList.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(addLine.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(addLine.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.list.push(payload);
    });
    builder.addCase(addLine.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(editLine.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(editLine.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      const target = state.list.find((item) => item.id === payload.id);
      if (target) {
        target.color = payload.color;
        target.name = payload.name;
      }
    });
    builder.addCase(editLine.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(deleteLine.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(deleteLine.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.list = state.list.filter((item) => item.id !== payload);
    });
    builder.addCase(deleteLine.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });
  },
});

export const { resetError } = lineSlice.actions;

export default lineSlice.reducer;
