import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { Station } from "../@types/types";
import { requestStation } from "../apis/station";

interface StationState {
  items: Station[];
  loading: boolean;
  error: Error | null;
}

const initialState: StationState = {
  items: [],
  loading: false,
  error: null,
};

export const getStations = createAsyncThunk("[STATION] LOAD", async () => {
  const stations = await requestStation.getAllStation();

  return stations;
});

export const addStation = createAsyncThunk("[STATION] ADD", async (stationName: string) => {
  const station = await requestStation.addStation(stationName);

  return station;
});

export const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {},
  extraReducers: {
    [getStations.pending.type]: (state) => {
      state.loading = true;
    },
    [getStations.fulfilled.type]: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    },
    [getStations.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [addStation.pending.type]: (state) => {
      state.loading = true;
    },
    [addStation.fulfilled.type]: (state, { payload }) => {
      state.items.push(payload);
      state.loading = false;
    },
    [addStation.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default stationSlice.reducer;
