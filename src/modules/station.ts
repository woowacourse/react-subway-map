import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
  isAllOf,
  createAction,
} from "@reduxjs/toolkit";

import { requestStation } from "../apis/station";

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";
import { Station } from "../@types";
import { ERROR_DURATION } from "../constants";

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

const resetError = createAction("[STATION] RESET_ERROR");

const isStationAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[STATION]");
};

const getStations = createAsyncThunk(
  "[STATION] LOAD",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const stations = await requestStation.getAllStation();

      return stations;
    } catch (err) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(err.response.data);
    }
  }
);

const addStation = createAsyncThunk(
  "[STATION] ADD",
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const station = await requestStation.addStation(name);

      return station;
    } catch (err) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(err.response.data);
    }
  }
);

const deleteStation = createAsyncThunk(
  "[STATION] DELETE",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await requestStation.deleteStation(id);

      return id;
    } catch (err) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(err.response.data);
    }
  }
);

const action = {
  getStations,
  addStation,
  deleteStation,
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

export default stationSlice.reducer;
export { action, stationSlice };
