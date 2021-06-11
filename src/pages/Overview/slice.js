import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import { ENDPOINT, MESSAGE, RESPONSE_CODE } from "../../api/constants";
import http from "../../api/http";
import { selectAccessToken } from "../Login/slice";

export const selectOverviewStatus = (state) => state.overview.status;
export const selectOverviewMessage = (state) => state.overview.message;
export const selectOverviewList = (state) => state.overview.list;
export const selectLineByLineId = (state, id) =>
  state.Overview.list.find((line) => line.id === id);

export const fetchOverview = createAsyncThunk(
  "overview/fetchOverview",
  async (_, { rejectWithValue, getState }) => {
    const accessToken = selectAccessToken(getState());

    try {
      const response = await http.get(ENDPOINT.LINES_DETAIL, {
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

const initialState = {
  status: STATUS.IDLE,
  error: null,
  message: "",
  list: [],
};

const overviewSlice = createSlice({
  name: "overview",
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
    [fetchOverview.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchOverview.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.list = action.payload;
    },
    [fetchOverview.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error;
      state.message = action.payload;
    },
  },
});

export const { reset } = overviewSlice.actions;

export default overviewSlice.reducer;
