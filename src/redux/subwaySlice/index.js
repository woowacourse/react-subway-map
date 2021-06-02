import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERROR, RESPONSE } from '../../constants';
import { request } from '../../utils';
import { handleRejected } from '../util';

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
    [getStationsThunk.rejected]: handleRejected,

    [addStationThunk.fulfilled]: (state, { payload: { station } }) => {
      state.stations.push(station);
    },
    [addStationThunk.rejected]: handleRejected,

    [deleteStationThunk.fulfilled]: (state, { payload: { stationId } }) => {
      state.stations = state.stations.filter(({ id }) => id !== stationId);
    },
    [deleteStationThunk.rejected]: handleRejected,

    [getLinesThunk.fulfilled]: (state, { payload: { lines } }) => {
      state.lines = lines;
    },
    [getLinesThunk.rejected]: handleRejected,

    [addLineThunk.fulfilled]: (state, { payload: { line } }) => {
      state.lines.push(line);
    },
    [addLineThunk.rejected]: handleRejected,

    [deleteLineThunk.fulfilled]: (state, { payload: { lineId } }) => {
      state.lines = state.lines.filter(({ id }) => id !== lineId);
    },
    [deleteLineThunk.rejected]: handleRejected,

    [addSectionThunk.fulfilled]: (state, { payload: { line } }) => {
      state.lines = state.lines.map((prevLine) => {
        return prevLine.id === line.id ? line : prevLine;
      });
    },
    [addSectionThunk.rejected]: handleRejected,

    [deleteSectionThunk.fulfilled]: (state, { payload: { line } }) => {
      state.lines = state.lines.map((prevLine) => {
        return prevLine.id === line.id ? line : prevLine;
      });
    },
    [deleteSectionThunk.rejected]: handleRejected,
  },
});

const subwayReducer = subwaySlice.reducer;

export default subwayReducer;
