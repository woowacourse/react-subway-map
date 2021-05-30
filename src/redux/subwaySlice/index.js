import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERROR, RESPONSE } from '../../constants';
import { request } from '../../utils';

export const getStationsThunk = createAsyncThunk(
  'subway/getStationsThunk',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.get('/stations');

      return { stations: response.data };
    } catch (error) {
      console.error(error);

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const addStationThunk = createAsyncThunk(
  'subway/addStationThunk',
  async ({ params }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.post('/stations', params);

      return { station: response.data };
    } catch (error) {
      console.error(error);

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const deleteStationThunk = createAsyncThunk(
  'subway/deleteStationThunk',
  async ({ id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      await request.delete(`/stations/${id}`);

      return { stationId: id };
    } catch (error) {
      console.error(error);

      if (error.response.status === 400) {
        return rejectWithValue({ error: RESPONSE.DELETE_STATION.FAIL });
      }

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const getLinesThunk = createAsyncThunk(
  'subway/getLinesThunk',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.get('/lines');

      return { lines: response.data };
    } catch (error) {
      console.error(error);

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const addLineThunk = createAsyncThunk(
  'subway/addLineThunk',
  async ({ params }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await request.post('/lines', params);

      return { line: response.data };
    } catch (error) {
      console.error(error);

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const deleteLineThunk = createAsyncThunk(
  'subway/deleteLineThunk',
  async ({ id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      await request.delete(`/lines/${id}`);

      return { lineId: id };
    } catch (error) {
      console.error(error);

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const addSectionThunk = createAsyncThunk(
  'subway/addSectionThunk',
  async ({ id, params }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      await request.post(`/lines/${id}/sections`, params);
      const response = await request.get(`/lines/${id}`);

      return { line: response.data };
    } catch (error) {
      console.error(error);

      if (error.response.status === 400) {
        return rejectWithValue({ error: error.response.data.message });
      }

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

export const deleteSectionThunk = createAsyncThunk(
  'subway/deleteSectionThunk',
  async ({ lineId, stationId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      await request.delete(`/lines/${lineId}/sections?stationId=${stationId}`);
      const response = await request.get(`/lines/${lineId}`);

      return { line: response.data };
    } catch (error) {
      console.error(error);

      if (error.response.status === 400) {
        return rejectWithValue({ error: error.response.data.message });
      }

      return rejectWithValue({ error: ERROR.UNKNOWN });
    }
  }
);

const subwaySlice = createSlice({
  name: 'subway',
  initialState: {
    stations: [],
    lines: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getStationsThunk.fulfilled]: (state, { payload: { stations } }) => {
      state.stations = stations;
    },
    [getStationsThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [addStationThunk.fulfilled]: (state, { payload: { station } }) => {
      state.stations.push(station);
    },
    [addStationThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [deleteStationThunk.fulfilled]: (state, { payload: { stationId } }) => {
      state.stations = state.stations.filter(({ id }) => id !== stationId);
    },
    [deleteStationThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [getLinesThunk.fulfilled]: (state, { payload: { lines } }) => {
      state.lines = lines;
    },
    [getLinesThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [addLineThunk.fulfilled]: (state, { payload: { line } }) => {
      state.lines.push(line);
    },
    [addLineThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [deleteLineThunk.fulfilled]: (state, { payload: { lineId } }) => {
      state.lines = state.lines.filter(({ id }) => id !== lineId);
    },
    [deleteLineThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [addSectionThunk.fulfilled]: (state, { payload: { line } }) => {
      state.lines = state.lines.map((prevLine) => {
        return prevLine.id === line.id ? line : prevLine;
      });
    },
    [addSectionThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },

    [deleteSectionThunk.fulfilled]: (state, { payload: { line } }) => {
      state.lines = state.lines.map((prevLine) => {
        return prevLine.id === line.id ? line : prevLine;
      });
    },
    [deleteSectionThunk.rejected]: (state, { payload: { error } }) => {
      state.error = error;
    },
  },
});

const subwayReducer = subwaySlice.reducer;

export default subwayReducer;
