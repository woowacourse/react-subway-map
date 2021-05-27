import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';
import { ApiStatus, Error, Station } from '../types';

interface StationState {
  status: ApiStatus;
  list: Station[];
  error: Error | null;
}

const initialState: StationState = {
  status: ApiStatus.IDLE,
  list: [],
  error: null,
};

export const getStationList = createAsyncThunk(
  'station/getStationList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/stations');

      const stationList: Station[] = response.data;

      return stationList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStation = createAsyncThunk(
  'station/addStation',
  async (name: Station['name'], { rejectWithValue }) => {
    try {
      const response = await API.post('/stations', { name });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editStation = createAsyncThunk(
  'station/editStation',
  async ({ id, name }: Station, { rejectWithValue }) => {
    try {
      const response = await API.put(`/stations/${id}`, { name });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStation = createAsyncThunk(
  'station/deleteStation',
  async (id: Station['id'], { rejectWithValue }) => {
    try {
      await API.delete(`/stations/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStationList.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(getStationList.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.list = payload;
      state.error = null;
    });
    builder.addCase(getStationList.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(addStation.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(addStation.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.list.push(payload);
    });
    builder.addCase(addStation.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(editStation.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(editStation.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      const target = state.list.find((item) => item.id === payload.id);
      if (target) target.name = payload.name;
    });
    builder.addCase(editStation.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });

    builder.addCase(deleteStation.pending, (state) => {
      state.status = ApiStatus.PENDING;
    });
    builder.addCase(deleteStation.fulfilled, (state, { payload }) => {
      state.status = ApiStatus.FULFILLED;
      state.list = state.list.filter((item) => item.id !== payload);
    });
    builder.addCase(deleteStation.rejected, (state, { payload }) => {
      state.status = ApiStatus.REJECTED;
      state.error = payload as Error;
    });
  },
});

export const { resetError } = stationSlice.actions;

export default stationSlice.reducer;
