import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getMap = createAsyncThunk('map/getMap', async ({ endpoint, accessToken }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/lines/map`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
  async ({ endpoint, accessToken, lineId, upStationId, downStationId, distance }, thunkAPI) => {
    try {
      const response = await fetch(`${endpoint}/lines/${lineId}/sections`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          upStationId,
          downStationId,
          distance,
        }),
      });

      if (response.status === 201) {
        return;
      }

      const body = await response.json();

      throw new Error(body.message);
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
      const response = await fetch(`${endpoint}/lines/${lineId}/sections?stationId=${stationId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 204) {
        return;
      }

      const { message } = await response.json();

      throw new Error(message);
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

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
      state.isLoading = false;
      state.isAddSuccess = false;
      state.isAddFail = false;
      state.isDeleteSuccess = false;
      state.isDeleteFail = false;
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
