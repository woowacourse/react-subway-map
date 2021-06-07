import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
  isAllOf,
} from "@reduxjs/toolkit";

import { Station } from "../@types/types";
import { requestStation } from "../apis/station";

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "./@shared/checkThunkActionStatus";

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

const isStationAction = (action: AnyAction): action is AnyAction => {
  return action.type.startsWith("[STATION]");
};

const getStations = createAsyncThunk(
  "[STATION] LOAD",
  async (_, { rejectWithValue }) => {
    try {
      const stations = await requestStation.getAllStation();

      return stations;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const addStation = createAsyncThunk(
  "[STATION] ADD",
  async (name: string, { rejectWithValue }) => {
    try {
      const station = await requestStation.addStation(name);

      return station;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const deleteStation = createAsyncThunk(
  "[STATION] DELETE",
  async (id: number, { rejectWithValue }) => {
    try {
      await requestStation.deleteStation(id);

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const action = {
  getStations,
  addStation,
  deleteStation,
};

export const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStations.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
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
