import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Station } from "../@types/types";

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

export const getStations = createAsyncThunk("station/load", async (data, { rejectWithValue }) => {});

export const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    getStations: (state) => {},
  },
});

export default stationSlice.reducer;
