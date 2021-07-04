import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { ENDPOINT, MESSAGE, RESPONSE_CODE } from "../../api/constants";
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

      if (response.status === RESPONSE_CODE.CREATE) {
        return { id, name };
      }

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
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

      if (response.status === RESPONSE_CODE.READ) {
        const list = await response.json();
        return list;
      }

      const { message } = await response.json();
      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
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

      if (response.status === RESPONSE_CODE.DELETE) {
        return id;
      }

      const { message } = await response.json();

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
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
  reducers: {
    reset: (state) => {
      state.status = STATUS.IDLE;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: {
    [addStation.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addStation.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = MESSAGE.STATIONS_ADD_SUCCEED;
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

export const { reset } = stationsSlice.actions;

export default stationsSlice.reducer;
