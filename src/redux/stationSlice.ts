import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Station } from '../types';
import { requestAddStation, requestGetStations } from './../api/stations';

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

interface AddStationData {
  baseURL: string;
  stationName: string;
}

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
const stationSlice = createSlice({
  name: 'station',
  initialState: {
    isLoading: false,
    errorMessage: '',
    stations: [] as Station[],
  },
  reducers: {},
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
  },
});

export default stationSlice.reducer;
