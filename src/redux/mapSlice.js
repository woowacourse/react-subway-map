import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestDelete, requestGet, requestPost } from '../services/httpRequest';

const getMap = createAsyncThunk('map/getMap', async (_, thunkAPI) => {
  try {
    const response = await requestGet('/lines/map');
    const body = await response.json();

    if (response.status === 200) {
      return { map: body };
    }

    throw new Error(body.message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const addSection = createAsyncThunk(
  'map/addSection',
  async ({ lineId, upStationId, downStationId, distance }, thunkAPI) => {
    try {
      const response = await requestPost(`/lines/${lineId}/sections`, { upStationId, downStationId, distance });

      if (response.status === 201) {
        return;
      }

      const { message } = await response.json();

      throw new Error(message);
    } catch (e) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const removeSection = createAsyncThunk('map/removeSection', async ({ lineId, stationId }, thunkAPI) => {
  try {
    const response = await requestDelete(`/lines/${lineId}/sections?stationId=${stationId}`);
    if (response.status === 204) {
      return;
    }

    const { message } = await response.json();

    throw new Error(message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    map: [],
    isLoading: false,
    isAddSuccess: false,
    isAddFail: false,
    isDeleteSuccess: false,
    isDeleteFail: false,
  },
  reducers: {
    clearMapProgress: (state) => {
      state.isAddSuccess = false;
      state.isAddFail = false;
      state.isDeleteSuccess = false;
      state.isDeleteFail = false;
    },
    clearMap: (state) => {
      state.map = [];
    },
  },
  extraReducers: {
    [getMap.fulfilled]: (state, action) => {
      const { map } = action.payload;

      state.map = map;
    },
    [getMap.pending]: (state) => {
      state.isLoading = true;
    },
    [getMap.rejected]: (state) => {
      state.isLoading = false;
    },

    [addSection.fulfilled]: (state) => {
      state.isAddSuccess = true;
    },
    [addSection.pending]: (state) => {
      state.isLoading = true;
    },
    [addSection.rejected]: (state) => {
      state.isAddFail = true;
      state.isLoading = false;
    },

    [removeSection.fulfilled]: (state) => {
      state.isDeleteSuccess = true;
    },
    [removeSection.pending]: (state) => {
      state.isLoading = true;
    },
    [removeSection.rejected]: (state) => {
      state.isDeleteFail = true;
      state.isLoading = false;
    },
  },
});

export { getMap, addSection, removeSection };
export const { clearMapProgress, clearMap } = mapSlice.actions;

export default mapSlice.reducer;
