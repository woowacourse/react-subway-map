import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { requestDelete, requestGet, requestPost } from '../utils';
import { SECTION } from '../constants';

const getMap = createAsyncThunk('map/getMap', async ({ endpoint, accessToken }, thunkAPI) => {
  try {
    const response = await requestGet({
      url: `${endpoint}/lines/map`,
      accessToken,
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw new Error(body.message);
    }

    return { map: body };
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const addSection = createAsyncThunk(
  'map/addSection',
  async ({ endpoint, accessToken, lineId, upStationId, downStationId, distance }, thunkAPI) => {
    try {
      const response = await requestPost({
        url: `${endpoint}/lines/${lineId}/sections`,
        body: {
          upStationId,
          downStationId,
          distance,
        },
        accessToken,
      });

      if (response.status !== 201) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const removeSection = createAsyncThunk(
  'map/removeSection',
  async ({ endpoint, accessToken, lineId, stationId }, thunkAPI) => {
    try {
      const response = await requestDelete({
        url: `${endpoint}/lines/${lineId}/sections?stationId=${stationId}`,
        accessToken,
      });

      if (response.status !== 204) {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const INITIAL_STATUS = {
  isLoading: false,
  isAddSuccess: false,
  message: '',
};

const INITIAL_STATE = {
  map: [],
  status: { ...INITIAL_STATUS },
};

const mapSlice = createSlice({
  name: 'map',
  initialState: INITIAL_STATE,
  reducers: {
    clearMap: (state) => {
      state = INITIAL_STATE;
    },
    clearMapStatus: (state) => {
      state.status = INITIAL_STATUS;
    },
  },
  extraReducers: {
    [getMap.fulfilled]: (state, action) => {
      const { map } = action.payload;

      state.map = map;
      state.status.isLoading = false;
    },
    [getMap.pending]: (state) => {
      state.status.isLoading = true;
    },
    [getMap.rejected]: (state) => {
      state.status.isLoading = false;
      state.status.message = SECTION.GET_FAIL;
    },

    [addSection.fulfilled]: (state) => {
      state.status.isLoading = false;
      state.status.isAddSuccess = true;
      state.status.message = SECTION.ADD_SUCCEED;
    },
    [addSection.pending]: (state) => {
      state.status.isLoading = true;
    },
    [addSection.rejected]: (state) => {
      state.status.isLoading = false;
      state.status.message = SECTION.ADD_FAIL;
    },

    [removeSection.fulfilled]: (state) => {
      state.status.isLoading = false;
      state.status.message = SECTION.DELETE_SUCCEED;
    },
    [removeSection.pending]: (state) => {
      state.status.isLoading = true;
    },
    [removeSection.rejected]: (state) => {
      state.status.isLoading = false;
      state.status.message = SECTION.DELETE_FAIL;
    },
  },
});

export { getMap, addSection, removeSection };
export const { clearMap, clearMapStatus } = mapSlice.actions;

export default mapSlice.reducer;
