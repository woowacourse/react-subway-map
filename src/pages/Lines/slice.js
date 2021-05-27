import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  LINES_ADD_SUCCEED,
  LINES_GET_SUCCEED,
  LINES_DELETE_SUCCEED,
  LINES_DETAIL_GET_SUCCEED,
  UNKNOWN_ERROR_MESSAGE,
} from "../../api/constants";
import http from "../../api/http";
import { selectAccessToken } from "../Login/slice";

export const selectLinesStatus = (state) => state.lines.status;
export const selectLinesMessage = (state) => state.lines.message;
export const selectLinesList = (state) => state.lines.list;
export const selectLinesDetails = (state) => state.lines.details;
export const selectLinesDetailByLineId = (state, id) =>
  state.lines.details.find((line) => line.id === Number(id));

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

export const deleteLinesById = createAsyncThunk(
  "lines/deleteLinesById",
  async (id, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.delete(`${ENDPOINT.LINES}/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === LINES_DELETE_SUCCEED.CODE) {
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

export const fetchLinesDetail = createAsyncThunk(
  "lines/fetchLinesDetail",
  async (_, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.get(ENDPOINT.LINES_DETAIL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === LINES_DETAIL_GET_SUCCEED.CODE) {
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
  details: [],
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
    [deleteLinesById.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [deleteLinesById.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    [deleteLinesById.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
    [fetchLinesDetail.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchLinesDetail.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.details = action.payload;
    },
    [fetchLinesDetail.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export const { reset } = linesSlice.actions;

export default linesSlice.reducer;
