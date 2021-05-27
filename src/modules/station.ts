import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const getStations = createAsyncThunk("[STATION] LOAD", async () => {
  const stations = await requestStation.getAllStation();

  return stations;
});

const addStation = createAsyncThunk("[STATION] ADD", async (name: string) => {
  const station = await requestStation.addStation(name);

  return station;
});

const deleteStation = createAsyncThunk("[STATION] DELETE", async (id: number) => {
  await requestStation.deleteStation(id);

  return id;
});

export const action = {
  getStations,
  addStation,
  deleteStation,
};

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
    [addStation.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [addStation.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [deleteStation.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteStation.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteStation.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default stationSlice.reducer;
