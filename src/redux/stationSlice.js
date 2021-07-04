import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { request } from '../services/httpRequest';

const fetchStations = createAsyncThunk('/station/fetchStations', async (_, thunkAPI) => {
  try {
    const response = await request.get('/stations');

    if (response.status === 200) {
      return { stations: response.data };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const addStation = createAsyncThunk('station/addStation', async ({ name }, thunkAPI) => {
  try {
    const response = await request.post('/stations', { name });

    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const removeStation = createAsyncThunk('station/removeStation', async ({ id }, thunkAPI) => {
  try {
    const response = await request.delete(`/stations/${id}`);

    if (response.status === 204) {
      return { id };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const stationSlice = createSlice({
  name: 'station',
  initialState: {
    stations: [],
    error: '',
    isLoading: false,
  },
  reducers: {
    clearStations: (state) => {
      state.stations = [];
    },
    clearStationState: (state) => {
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchStations.fulfilled]: (state, action) => {
      const { stations } = action.payload;

      state.stations = stations;
    },
    [fetchStations.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchStations.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [addStation.fulfilled]: (state, action) => {
      const { id, name } = action.payload;

      state.stations = [{ id, name }, ...state.stations];
    },
    [addStation.pending]: (state) => {
      state.isLoading = true;
    },
    [addStation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [removeStation.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.stations = state.stations.filter((station) => station.id !== id);
    },
    [removeStation.pending]: (state) => {
      state.isLoading = true;
    },
    [removeStation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export { addStation, fetchStations, removeStation };
export const { clearStations, clearStationState } = stationSlice.actions;

export default stationSlice.reducer;
