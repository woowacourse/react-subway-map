import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import MESSAGE from 'constants/message';
import { StationInterface } from 'types';

interface AddStationPayload {
  name: string;
}

interface DeleteStationPayload {
  id: number;
}

export const getStationAsync = createAsyncThunk('station/getStationAsync', async () => {
  const response = await axios.get('/stations');

  return response.data;
});

export const addStationAsync = createAsyncThunk('station/addStationAsync', async ({ name }: AddStationPayload) => {
  const response = await axios.post('/stations', { name });

  return response.data;
});

export const deleteStationAsync = createAsyncThunk(
  'station/deleteStationAsync',
  async ({ id }: DeleteStationPayload) => {
    await axios.delete(`/stations/${id}`);

    return id;
  }
);

const initialState: { stations: StationInterface[] | null } = {
  stations: null,
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStationAsync.fulfilled, (state, action) => {
      state.stations = action.payload;
    });
    builder.addCase(getStationAsync.rejected, () => {
      throw Error(MESSAGE.STATION.GET_LIST_FAIL);
    });
    builder.addCase(addStationAsync.fulfilled, (state, action) => {
      state.stations = state.stations ? state.stations.concat(action.payload) : [action.payload];
    });
    builder.addCase(addStationAsync.rejected, () => {
      throw Error(MESSAGE.STATION.ADD_FAIL);
    });
    builder.addCase(deleteStationAsync.fulfilled, (state, action) => {
      state.stations = state.stations?.filter(({ id }) => id !== action.payload) || null;
    });
    builder.addCase(deleteStationAsync.rejected, () => {
      throw Error(MESSAGE.STATION.DELETE_FAIL);
    });
  },
});

export default stationSlice.reducer;
