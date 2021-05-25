import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Station } from '../../interfaces';

interface SetStationAction {
  stations: Station[];
}

export interface ErrorAction {
  error: string;
}

interface StationState {
  stations: Station[];
  error: string;
}

const initialState = {
  stations: [],
  error: '',
} as StationState;

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<SetStationAction>) => {
      state.stations = action.payload.stations;
    },
    getStationsAsync: () => {},
    error: (state, action: PayloadAction<ErrorAction>) => {
      state.error = action.payload.error;
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type StationActions = ReturnType<
  | typeof stationSlice.actions.setStations
  | typeof stationSlice.actions.getStationsAsync
  | typeof stationSlice.actions.error
  | typeof stationSlice.actions.pending
>;

export const { setStations, getStationsAsync, error, pending } = stationSlice.actions;
export default stationSlice.reducer;
