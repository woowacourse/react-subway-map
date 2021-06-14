import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Station } from '../../types';
import {
  requestAddStation,
  requestDeleteStation,
  requestGetStations,
  requestGetStationTransferInfoList,
} from '../../API/stations';
import { ErrorMessageResponse } from '../store';

export const loadStations = createAsyncThunk<
  Station[],
  undefined,
  { rejectValue: ErrorMessageResponse }
>('station/load', async (_, { rejectWithValue }) => {
  try {
    const { data: stations } = await requestGetStations();
    const { data: transferInfoList } = await requestGetStationTransferInfoList();

    const stationsWithTransfer = stations.map((station) => {
      const transferInfo = transferInfoList.find((transferInfo) => transferInfo.id === station.id);

      if (!transferInfo) {
        return {
          ...station,
          transfer: [],
        };
      }

      return transferInfo;
    });

    return stationsWithTransfer;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addStation = createAsyncThunk<Station, string, { rejectValue: ErrorMessageResponse }>(
  'station/add',
  async (stationName: string, { rejectWithValue }) => {
    try {
      const response = await requestAddStation(stationName);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStation = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorMessageResponse }
>('station/delete', async (stationId, { rejectWithValue }) => {
  try {
    await requestDeleteStation(stationId);

    return stationId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  errorMessage: '',
  stations: [] as Station[],
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    clearStations: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loadStations.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(loadStations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = action.payload;
    });
    builder.addCase(loadStations.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = (action.payload as ErrorMessageResponse).errorMessage;
    });

    builder.addCase(addStation.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(addStation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = [action.payload, ...state.stations];
    });
    builder.addCase(addStation.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = (action.payload as ErrorMessageResponse).errorMessage;
    });

    builder.addCase(deleteStation.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(deleteStation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stations = state.stations.filter(({ id }) => id !== action.payload);
    });
    builder.addCase(deleteStation.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = (action.payload as ErrorMessageResponse).errorMessage;
    });
  },
});

export const { clearStations } = stationSlice.actions;

export default stationSlice.reducer;
