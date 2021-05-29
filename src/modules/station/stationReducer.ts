import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Station } from '../../interfaces';

interface SetStationPayload {
  stations: Station[];
}

export interface AddStationPayload {
  name: Station['name'];
}

export interface DeleteStationPayload {
  id: Station['id'];
}
export interface ErrorPayload {
  error: string;
}

export interface StationState {
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
    setStations: (state, action: PayloadAction<SetStationPayload>) => {
      state.stations = action.payload.stations.sort((a, b) => b.id - a.id);
    },
    getStationsAsync: () => {},
    addStationAsync: (state, action: PayloadAction<AddStationPayload>) => {},
    deleteStationAsync: (state, action: PayloadAction<DeleteStationPayload>) => {},
    error: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload.error;
    },
    resetError: state => {
      state.error = '';
    },
    pending: state => {
      state.error = '';
    },
  },
});

export type StationActions = ReturnType<
  | typeof stationSlice.actions.setStations
  | typeof stationSlice.actions.getStationsAsync
  | typeof stationSlice.actions.addStationAsync
  | typeof stationSlice.actions.deleteStationAsync
  | typeof stationSlice.actions.error
  | typeof stationSlice.actions.resetError
  | typeof stationSlice.actions.pending
>;

export const { setStations, getStationsAsync, addStationAsync, deleteStationAsync, error, resetError, pending } =
  stationSlice.actions;
export default stationSlice.reducer;
