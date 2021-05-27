import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  LINES_ADD_SUCCEED,
  LINES_GET_SUCCEED,
  UNKNOWN_ERROR_MESSAGE,
} from "../../api/constants";
import http from "../../api/http";
import { selectAccessToken } from "../Login/slice";

export const selectLinesStatus = (state) => state.lines.status;
export const selectLinesMessage = (state) => state.lines.message;
export const selectLinesList = (state) => state.lines.list;

export const addLine = createAsyncThunk(
  "lines/addLine",
  async (
    { lineName, color, upStationId, downStationId, distance },
    { rejectWithValue, getState }
  ) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.post(ENDPOINT.LINES, {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { name: lineName, color, upStationId, downStationId, distance },
      });

      const body = await response.json();

      if (response.status === LINES_ADD_SUCCEED.CODE) {
        return body;
      }

      return rejectWithValue(body.message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

export const fetchLines = createAsyncThunk(
  "lines/fetchLines",
  async (_, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.get(ENDPOINT.LINES, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === LINES_GET_SUCCEED.CODE) {
        return response.json();
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

const linesSlice = createSlice({
  name: "lines",
  initialState,
  reducers: {
    reset: (state) => ({ ...state, status: STATUS.IDLE }),
  },
  extraReducers: {
    [addLine.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addLine.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = LINES_ADD_SUCCEED;
      state.list.push(action.payload);
    },
    [addLine.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
    [fetchLines.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchLines.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.list = action.payload;
    },
    [fetchLines.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export const { reset } = linesSlice.actions;

export default linesSlice.reducer;
