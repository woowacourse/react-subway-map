import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'API/API';
import { StationInterface } from 'types';

interface StationPayload {
  name: string;
}

export const getStationAsync = createAsyncThunk('station/getStationAsync', async () => {
  try {
    const response = await API.get('/stations');

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const addStationAsync = createAsyncThunk('station/addStationAsync', async ({ name }: StationPayload) => {
  try {
    const response = await API.post('/stations', { name });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

// export const deleteStationAsync;

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
      if (state.stations) {
        state.stations.push(action.payload);

        return;
      }

      state.stations = [action.payload];
    });
    builder.addCase(addStationAsync.rejected, () => {
      throw Error('역 생성에 실패하였습니다.');
    });
  },
});

export default stationSlice.reducer;
