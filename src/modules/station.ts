import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
  isAllOf,
  createAction,
} from "@reduxjs/toolkit";

import { stations } from "../apis/stations";

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
    const response = await stations.getAllStation();

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const addStation = createAsyncThunk(
  "[STATION] ADD",
  async (name: string, { dispatch, rejectWithValue }) => {
    const response = await stations.addStation(name);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
  }
);

const deleteStation = createAsyncThunk(
  "[STATION] DELETE",
  async (id: number, { dispatch, rejectWithValue }) => {
    const response = await stations.deleteStation(id);

    if (!response.success) {
      setTimeout(() => {
        dispatch(resetError());
      }, ERROR_DURATION);

      return rejectWithValue(response.result);
    }

    return response.result;
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
