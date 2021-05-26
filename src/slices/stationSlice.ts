import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api';
import { ApiStatus, Error, Station } from '../types';
import { AuthState } from './authSlice';

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
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const response = await API[auth.server].get('/stations');

      const stationList: Station[] = response.data;

      return stationList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStation = createAsyncThunk(
  'station/addStation',
  async (name: Station['name'], { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const response = await API[auth.server].post('/stations', { name });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editStation = createAsyncThunk(
  'station/editStation',
  async ({ id, name }: Station, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const response = await API[auth.server].put(`/stations/${id}`, { name });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStation = createAsyncThunk(
  'station/deleteStation',
  async (id: Station['id'], { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      await API[auth.server].delete(`/stations/${id}`);

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
