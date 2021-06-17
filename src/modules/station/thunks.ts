import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { stations } from "../../apis";

import { ERROR_DURATION } from "../../constants";

const resetError = createAction("[STATION] RESET_ERROR");

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

export { getStations, addStation, deleteStation, resetError };
