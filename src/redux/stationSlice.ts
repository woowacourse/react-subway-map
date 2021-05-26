import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Station } from '../types';
import { requestAddStation, requestDeleteStation, requestGetStations } from './../api/stations';

interface AddStationData {
  baseURL: string;
  stationName: string;
}

interface DeleteStationData {
  baseURL: string;
  stationId: number;
}

export const loadStations = createAsyncThunk(
  'station/load',
  async (baseURL: string, { rejectWithValue }) => {
    try {
      const response = await requestGetStations(baseURL);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addStation = createAsyncThunk(
  'station/add',
  async ({ baseURL, stationName }: AddStationData, { rejectWithValue }) => {
    try {
      const response = await requestAddStation(baseURL, stationName);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStation = createAsyncThunk(
  'station/delete',
  async ({ baseURL, stationId }: DeleteStationData, { rejectWithValue }) => {
    try {
      await requestDeleteStation(baseURL, stationId);

      return stationId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  errorMessage: '',
  stations: [] as Station[],
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    clearStations: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadStations.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(loadStations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = action.payload;
    });
    builder.addCase(loadStations.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });

    builder.addCase(addStation.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(addStation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = [action.payload, ...state.stations];
    });
    builder.addCase(addStation.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });

    builder.addCase(deleteStation.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(deleteStation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = state.stations.filter(({ id }) => id !== action.payload);
    });
    builder.addCase(deleteStation.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message as string;
    });
  },
});

export const { clearStations } = stationSlice.actions;

export default stationSlice.reducer;
