import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestGetStations } from './../api/stations';

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

export const stationSlice = createSlice({
  name: 'station',
  initialState: {
    isLoading: false,
    errorMessage: '',
    stations: [],
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
      state.errorMessage = action.error.message;
    });
  },
});

export default stationSlice.reducer;
