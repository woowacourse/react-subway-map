import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Station } from '../../interfaces';

type SetStationsPayload = Station[];

export type AddStationPayload = Station['name'];

export type DeleteStationPayload = Station['id'];

export type EditStationPayload = { id: Station['id']; name: Station['name'] };

export type ErrorPayload = string;

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
    setStations: (state, action: PayloadAction<SetStationsPayload>) => {
      state.stations = action.payload.sort((a, b) => b.id - a.id);
    },
    getStationsAsync: () => {},
    addStationAsync: (state, action: PayloadAction<AddStationPayload>) => {},
    deleteStationAsync: (state, action: PayloadAction<DeleteStationPayload>) => {},
    editStationAsync: (state, action: PayloadAction<EditStationPayload>) => {},
    error: (state, action: PayloadAction<ErrorPayload>) => {
      state.error = action.payload;
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
  | typeof stationSlice.actions.editStationAsync
  | typeof stationSlice.actions.error
  | typeof stationSlice.actions.resetError
  | typeof stationSlice.actions.pending
>;

export const {
  setStations,
  getStationsAsync,
  addStationAsync,
  deleteStationAsync,
  editStationAsync,
  error,
  resetError,
  pending,
} = stationSlice.actions;
export default stationSlice.reducer;
