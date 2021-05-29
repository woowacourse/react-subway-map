import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  StationState,
  AddStationAction,
  DeleteStationAction,
  ErrorAction,
  SetStationAction,
} from '../../interfaces/station';

const initialState = {
  stations: [],
  error: '',
} as StationState;

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    pending: state => {
      state.error = '';
    },
    error: (state, action: PayloadAction<ErrorAction['payload']>) => {
      state.error = action.payload.error;
    },
    resetError: state => {
      state.error = '';
    },
    setStations: (state, action: PayloadAction<SetStationAction['payload']>) => {
      state.stations = action.payload.stations.sort((a, b) => b.id - a.id);
    },
    getStationsAsync: () => {},
    addStationAsync: (state, action: PayloadAction<AddStationAction['payload']>) => {},
    deleteStationAsync: (state, action: PayloadAction<DeleteStationAction['payload']>) => {},
  },
});

export type StationActions = ReturnType<
  | typeof stationSlice.actions.pending
  | typeof stationSlice.actions.error
  | typeof stationSlice.actions.resetError
  | typeof stationSlice.actions.setStations
  | typeof stationSlice.actions.getStationsAsync
  | typeof stationSlice.actions.addStationAsync
  | typeof stationSlice.actions.deleteStationAsync
>;

export const { pending, error, resetError, setStations, getStationsAsync, addStationAsync, deleteStationAsync } =
  stationSlice.actions;
export default stationSlice.reducer;
