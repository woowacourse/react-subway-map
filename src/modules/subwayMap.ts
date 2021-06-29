import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { SubwayMapItem } from "../@types/types";
import { requestSubwayMap } from "../apis/subwayMap";

interface SubwayMapState {
  items: SubwayMapItem[];
  loading: boolean;
  error: Error | null;
}

const initialState: SubwayMapState = {
  items: [],
  loading: false,
  error: null,
};

const getSubwayMap = createAsyncThunk("[SUBWAY MAP] LOAD", async (_, { rejectWithValue }) => {
  try {
    const subwayMap = await requestSubwayMap.getSubwayMap();

    return subwayMap;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const action = {
  getSubwayMap,
};

export const subwayMapSlice = createSlice({
  name: "subwayMap",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubwayMap.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSubwayMap.fulfilled.type]: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
      state.error = null;
    },
    [getSubwayMap.rejected.type]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default subwayMapSlice.reducer;
