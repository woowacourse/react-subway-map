import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getStations = createAsyncThunk('station/getStations', async ({ baseUrl, accessToken }, thunkAPI) => {
  try {
    const response = await fetch(`${baseUrl}/stations`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const body = await response.json();

    if (response.status === 200) {
      return { stations: body };
    }

    throw new Error(body.message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const addStation = createAsyncThunk('station/addStation', async ({ baseUrl, accessToken, name }, thunkAPI) => {
  try {
    const response = await fetch(`${baseUrl}/stations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
      }),
    });

    const body = await response.json();

    if (response.status === 201) {
      return body;
    }

    throw new Error(body.message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const removeStation = createAsyncThunk('station/removeStation', async ({ baseUrl, accessToken, id }, thunkAPI) => {
  try {
    const response = await fetch(`${baseUrl}/stations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      return { id };
    }

    const body = await response.json();

    throw new Error(body.message);
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const stationSlice = createSlice({
  name: 'station',
  initialState: {
    stations: [],
    isLoading: false,
    isAddSuccess: false,
    isAddFail: false,
    isDeleteSuccess: false,
    isDeleteFail: false,
  },
  reducers: {
    clearStation: (state) => {
      state.stations = [];
    },
    clearStationProgress: (state) => {
      state.isAddSuccess = false;
      state.isAddFail = false;
      state.isDeleteSuccess = false;
      state.isDeleteFail = false;
    },
  },
  extraReducers: {
    [getStations.fulfilled]: (state, action) => {
      const { stations } = action.payload;

      state.stations = stations;
    },
    [getStations.pending]: (state) => {
      state.isLoading = true;
    },
    [getStations.rejected]: (state) => {
      state.isLoading = false;
    },

    [addStation.fulfilled]: (state, action) => {
      const { id, name } = action.payload;

      state.stations = [{ id, name }, ...state.stations];
      state.isAddSuccess = true;
    },
    [addStation.pending]: (state) => {
      state.isLoading = true;
    },
    [addStation.rejected]: (state) => {
      state.isAddFail = true;
      state.isLoading = false;
    },

    [removeStation.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.stations = state.stations.filter((station) => station.id !== id);
      state.isDeleteSuccess = true;
    },
    [removeStation.pending]: (state) => {
      state.isLoading = true;
    },
    [removeStation.rejected]: (state) => {
      state.isDeleteFail = true;
      state.isLoading = false;
    },
  },
});

export { getStations, addStation, removeStation };
export const { clearStationProgress, clearStation } = stationSlice.actions;

export default stationSlice.reducer;
