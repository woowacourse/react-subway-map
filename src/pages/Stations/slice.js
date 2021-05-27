import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  STATIONS_ADD_SUCCEED,
  STATIONS_GET_SUCCEED,
  STATIONS_DELETE_SUCCEED,
  UNKNOWN_ERROR_MESSAGE,
} from "../../api/constants";
import http from "../../api/http";
import { selectAccessToken } from "../Login/slice";

export const selectStationsStatus = (state) => state.stations.status;
export const selectStationsMessage = (state) => state.stations.message;
export const selectStationsList = (state) => state.stations.list;

export const addStation = createAsyncThunk(
  "stations/addStation",
  async (stationName, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.post(ENDPOINT.STATIONS, {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { name: stationName },
      });

      const { id, name, message } = await response.json();

      if (response.status === STATIONS_ADD_SUCCEED.CODE) {
        return { id, name };
      }

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async (_, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.get(ENDPOINT.STATIONS, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === STATIONS_GET_SUCCEED.CODE) {
        const list = await response.json();
        return list;
      }

      const { message } = await response.json();
      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

export const deleteStationById = createAsyncThunk(
  "stations/deleteStationById",
  async (id, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.delete(`${ENDPOINT.STATIONS}/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === STATIONS_DELETE_SUCCEED.CODE) {
        return Number(id);
      }

      const { message } = await response.json();

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

const initialState = {
  status: STATUS.IDLE,
  error: null,
  message: "",
  list: [],
};

const stationsSlice = createSlice({
  name: "stations",
  initialState,
  extraReducers: {
    [addStation.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addStation.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = STATIONS_ADD_SUCCEED;
      state.list.push(action.payload);
    },
    [addStation.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
    [fetchStations.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchStations.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.list = action.payload;
    },
    [fetchStations.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
    [deleteStationById.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [deleteStationById.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    [deleteStationById.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export default stationsSlice.reducer;
