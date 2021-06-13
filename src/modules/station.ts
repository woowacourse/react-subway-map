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

const getStations = createAsyncThunk("[STATION] LOAD", async (_, { rejectWithValue }) => {
  try {
    const stations = await requestStation.getAllStation();

    return stations;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const addStation = createAsyncThunk("[STATION] ADD", async (name: string, { rejectWithValue }) => {
  try {
    const station = await requestStation.addStation(name);

    return station;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const deleteStation = createAsyncThunk("[STATION] DELETE", async (id: number, { rejectWithValue }) => {
  try {
    await requestStation.deleteStation(id);

    return id;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
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
