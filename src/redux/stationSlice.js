import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getStations = createAsyncThunk('station/getStations', async ({ endpoint }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/stations`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    if (response.status === 200) {
      return { stations: body };
    } else {
      throw new Error(body);
    }
  } catch (e) {
    console.error(e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const addStation = createAsyncThunk('station/addStation', async ({ endpoint, name }, thunkAPI) => {
  try {
    const response = await fetch(`${endpoint}/stations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });

    const body = await response.json();

    if (response.status === 200) {
      return body;
    } else {
      throw new Error(body);
    }
  } catch (e) {
    console.error(e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const stationSlice = createSlice({
  name: 'station',
  initialState: { stations: [], isLoading: false },
  reducers: {},
  extraReducers: {
    [addStation.fulfilled]: (state, action) => {
      const { id, name } = action.payload;

      state.push({ id, name });
    },
    [addStation.pending]: (state) => {
      state.isLoading = true;
    },
    [addStation.rejected]: (state) => {
      state.isLoading = false;
    },
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
  },
});

export { getStations, addStation };

export default stationSlice.reducer;
