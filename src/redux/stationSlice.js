import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestGet, requestPost, requestDelete } from '../utils/httpClient';
import { STATION } from '../constants';

const getStations = createAsyncThunk('station/getStations', async ({ endpoint, accessToken }, thunkAPI) => {
  try {
    const response = await requestGet({
      url: `${endpoint}/stations`,
      accessToken,
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw new Error(body.message);
    }

    return { stations: body };
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const addStation = createAsyncThunk('station/addStation', async ({ endpoint, accessToken, name }, thunkAPI) => {
  try {
    const response = await requestPost({
      url: `${endpoint}/stations`,
      body: JSON.stringify({ name }),
      accessToken,
    });
    const body = await response.json();

    if (response.status !== 201) {
      throw new Error(body.message);
    }

    return body;
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const removeStation = createAsyncThunk('station/removeStation', async ({ endpoint, accessToken, id }, thunkAPI) => {
  try {
    const response = await requestDelete({
      url: `${endpoint}/stations/${id}`,
      accessToken,
    });

    if (response.status !== 204) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return { id };
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const INITIAL_STATUS = {
  isLoading: false,
  isAddSuccess: false,
  message: '',
};

const INITIAL_STATE = {
  stations: [],
  status: { ...INITIAL_STATUS },
};

const stationSlice = createSlice({
  name: 'station',
  initialState: INITIAL_STATE,
  reducers: {
    clearStation: (state) => {
      state = INITIAL_STATE;
    },
    clearStationStatus: (state) => {
      state.status = INITIAL_STATUS;
    },
  },
  extraReducers: {
    [getStations.fulfilled]: (state, action) => {
      const { stations } = action.payload;

      state.stations = stations;
      state.status.isLoading = false;
    },
    [getStations.pending]: (state) => {
      state.status.isLoading = true;
    },
    [getStations.rejected]: (state) => {
      state.status.isLoading = false;
      state.status.message = STATION.GET_FAIL;
    },

    [addStation.fulfilled]: (state, action) => {
      const { id, name } = action.payload;

      state.stations = [{ id, name }, ...state.stations];
      state.status.isLoading = false;
      state.status.isAddSuccess = true;
      state.status.message = STATION.ADD_SUCCEED;
    },
    [addStation.pending]: (state) => {
      state.status.isLoading = true;
    },
    [addStation.rejected]: (state) => {
      state.status.isLoading = false;
      state.status.message = STATION.ADD_FAIL;
    },

    [removeStation.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.stations = state.stations.filter((station) => station.id !== id);
      state.status.isLoading = false;
      state.status.message = STATION.DELETE_SUCCEED;
    },
    [removeStation.pending]: (state) => {
      state.status.isLoading = true;
    },
    [removeStation.rejected]: (state) => {
      state.status.isLoading = false;
      state.status.message = STATION.DELETE_FAIL;
    },
  },
});

export { getStations, addStation, removeStation };
export const { clearStation, clearStationStatus } = stationSlice.actions;

export default stationSlice.reducer;
