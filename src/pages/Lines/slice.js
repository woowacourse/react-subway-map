/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { ENDPOINT, MESSAGE, RESPONSE_CODE } from "../../api/constants";
import http from "../../api/http";
import { selectAccessToken } from "../Login/slice";

export const selectLinesStatus = (state) => state.lines.status;
export const selectLinesMessage = (state) => state.lines.message;
export const selectLinesList = (state) => state.lines.list;
export const selectLineByLineId = (state, id) =>
  state.lines.list.find((line) => line.id === id);

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

      if (response.status === RESPONSE_CODE.CREATE) {
        return body;
      }

      return rejectWithValue(body.message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
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

      if (response.status === RESPONSE_CODE.READ) {
        return response.json();
      }

      const { message } = await response.json();
      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
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

export const addSection = createAsyncThunk(
  "lines/addSection",
  async (
    { lineId, upStationId, downStationId, distance },
    { rejectWithValue, getState }
  ) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.post(`${ENDPOINT.LINES}/${lineId}/sections`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { upStationId, downStationId, distance },
      });

      if (response.status === RESPONSE_CODE.CREATE) {
        return response.json();
      }

      const { message } = await response.json();

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(MESSAGE.UNKNOWN_ERROR);
    }
  }
);

export const deleteSection = createAsyncThunk(
  "lines/deleteSection",
  async ({ lineId, stationId }, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.delete(
        `${ENDPOINT.LINES}/${lineId}/sections?stationId=${stationId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === RESPONSE_CODE.DELETE) {
        return { lineId, stationId };
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

const linesSlice = createSlice({
  name: "lines",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      status: STATUS.IDLE,
      message: "",
      error: null,
    }),
  },
  extraReducers: {
    [addLine.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addLine.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = MESSAGE.LINES_ADD_SUCCEED;
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
    [addSection.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addSection.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = MESSAGE.SECTIONS_ADD_SUCCEED;

      const newLineInfo = action.payload;

      state.list = state.list.map((line) =>
        line.id === newLineInfo.id ? newLineInfo : line
      );
    },
    [addSection.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
    [deleteSection.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [deleteSection.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;

      const { lineId, stationId } = action.payload;
      const lineIndex = state.list.findIndex((line) => line.id === lineId);

      state.list[lineIndex].stations = state.list[lineIndex].stations.filter(
        (station) => station.id !== stationId
      );
    },
    [deleteSection.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export const { reset } = linesSlice.actions;

export default linesSlice.reducer;
