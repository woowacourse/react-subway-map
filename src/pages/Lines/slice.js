/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  LINES_ADD_SUCCEED,
  LINES_GET_SUCCEED,
  LINES_DELETE_SUCCEED,
  SECTIONS_ADD_SUCCEED,
  UNKNOWN_ERROR_MESSAGE,
  SECTIONS_DELETE_SUCCEED,
} from "../../api/constants";
import http from "../../api/http";
import { selectAccessToken } from "../Login/slice";

export const selectLinesStatus = (state) => state.lines.status;
export const selectLinesMessage = (state) => state.lines.message;
export const selectLinesList = (state) => state.lines.list;
// TODO: id 는 Number Type 으로 일치시킨다
export const selectLineByLineId = (state, id) =>
  state.lines.list.find((line) => line.id === Number(id));

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

      if (response.status === SECTIONS_ADD_SUCCEED.CODE) {
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

      if (response.status === SECTIONS_DELETE_SUCCEED.CODE) {
        return { lineId, stationId };
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
      state.message = LINES_ADD_SUCCEED.MESSAGE;
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
      state.message = SECTIONS_ADD_SUCCEED.MESSAGE;

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
      const lineIndex = state.list.findIndex(
        (line) => line.id === Number(lineId)
      );

      state.list[lineIndex].stations = state.list[lineIndex].stations.filter(
        (station) => station.id !== Number(stationId)
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
