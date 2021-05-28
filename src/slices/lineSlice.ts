import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';
import { ApiStatus, Error, Line, Station, LineAttribute, SectionAttribute } from '../types';

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
  async ({ id, name, color }: Pick<Line, 'id' | 'name' | 'color'>, { rejectWithValue }) => {
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

export const addSection = createAsyncThunk(
  'line/addSection',
  async (newSection: SectionAttribute, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post(`/lines/${newSection.lineId}/sections`, newSection.data);
      dispatch(getLineList());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSection = createAsyncThunk(
  'line/deleteSection',
  async (
    { lineId, stationId }: { lineId: Line['id']; stationId: Station['id'] },
    { rejectWithValue }
  ) => {
    try {
      await API.delete(`/lines/${lineId}/sections?stationId=${stationId}`);

      return { lineId, stationId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    resetLine: () => {
      return initialState;
    },
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

    builder.addCase(addSection.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(addSection.fulfilled, (state) => {
      state.status = ApiStatus.FULFILLED;
    });
    builder.addCase(addSection.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(deleteSection.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(deleteSection.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;

      const targetLine = state.list.find((line) => line.id === payload.lineId);
      const targetStationIndex = targetLine?.stations.findIndex(
        (station) => station.id === payload.stationId
      );

      if (targetLine && targetStationIndex) {
        targetLine.stations.splice(targetStationIndex, 1);
      }
    });
    builder.addCase(deleteSection.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });
  },
});

export const { resetLine, resetError } = lineSlice.actions;

export default lineSlice.reducer;
