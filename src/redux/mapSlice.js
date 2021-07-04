import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { request } from '../services/httpRequest';

const fetchMap = createAsyncThunk('map/fetchMap', async (_, thunkAPI) => {
  try {
    const response = await request.get('/lines/map');

    if (response.status === 200) {
      return { map: response.data };
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const addSection = createAsyncThunk(
  'map/addSection',
  async ({ lineId, upStationId, downStationId, distance }, thunkAPI) => {
    try {
      const response = await request.post(`/lines/${lineId}/sections`, { upStationId, downStationId, distance });

      if (response.status === 201) {
        return;
      }
    } catch (e) {
      const { error } = e.response.data;
      console.error(error);

      return thunkAPI.rejectWithValue(error);
    }
  },
);

const removeSection = createAsyncThunk('map/removeSection', async ({ lineId, stationId }, thunkAPI) => {
  try {
    const response = await request.delete(`/lines/${lineId}/sections?stationId=${stationId}`);
    if (response.status === 204) {
      return;
    }
  } catch (e) {
    const { error } = e.response.data;
    console.error(error);

    return thunkAPI.rejectWithValue(error);
  }
});

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: [],
    isLoading: false,
    error: '',
  },
  reducers: {
    clearMap: (state) => {
      state.map = [];
    },
    clearMapState: (state) => {
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchMap.fulfilled]: (state, action) => {
      const { map } = action.payload;

      state.map = map;
    },
    [fetchMap.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMap.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [addSection.pending]: (state) => {
      state.isLoading = true;
    },
    [addSection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [removeSection.pending]: (state) => {
      state.isLoading = true;
    },
    [removeSection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export { addSection, fetchMap, removeSection };
export const { clearMap, clearMapState } = mapSlice.actions;

export default mapSlice.reducer;
