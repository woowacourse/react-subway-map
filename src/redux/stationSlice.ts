import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StationInterface } from 'types';

interface AddStationPayload {
  name: string;
}

interface DeleteStationPayload {
  id: number;
}

export const getStationAsync = createAsyncThunk('station/getStationAsync', async () => {
  try {
    const response = await axios.get('/stations');

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const addStationAsync = createAsyncThunk('station/addStationAsync', async ({ name }: AddStationPayload) => {
  try {
    const response = await axios.post('/stations', { name });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteStationAsync = createAsyncThunk(
  'station/deleteStationAsync',
  async ({ id }: DeleteStationPayload) => {
    try {
      await axios.delete(`/stations/${id}`);

      return id;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const initialState: { stations: StationInterface[] | null } = {
  stations: null,
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStationAsync.fulfilled, (state, action) => {
      state.stations = action.payload;
    });
    builder.addCase(getStationAsync.rejected, () => {
      throw Error('역 목록 조회에 실패하였습니다.');
    });
    builder.addCase(addStationAsync.fulfilled, (state, action) => {
      state.stations = state.stations ? state.stations.concat(action.payload) : [action.payload];
    });
    builder.addCase(addStationAsync.rejected, () => {
      throw Error('역 생성에 실패하였습니다.');
    });
    builder.addCase(deleteStationAsync.fulfilled, (state, action) => {
      state.stations = state.stations?.filter(({ id }) => id !== action.payload) || null;
    });
    builder.addCase(deleteStationAsync.rejected, () => {
      throw Error('역 삭제에 실패하였습니다.');
    });
  },
});

export default stationSlice.reducer;
