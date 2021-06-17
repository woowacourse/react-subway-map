import { createSlice, isAllOf, PayloadAction } from "@reduxjs/toolkit";

import { getStations, addStation, deleteStation, resetError } from "./thunks";

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../@shared/checkThunkActionStatus";
import { isStationAction, StationState } from "./types";

const initialState: StationState = {
  items: [],
  loading: false,
  error: null,
};

const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStations.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(resetError, (state) => {
        state.error = null;
      })
      .addMatcher(isAllOf(isStationAction, isFulfilledAction), (state) => {
        state.loading = false;
      })
      .addMatcher(isAllOf(isStationAction, isPendingAction), (state) => {
        state.loading = true;
      })
      .addMatcher(
        isAllOf(isStationAction, isRejectedAction),
        (state, { payload }: PayloadAction<Error>) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

const action = {
  getStations,
  addStation,
  deleteStation,
  resetError,
};

export default stationSlice.reducer;
export { stationSlice };
export { action };
