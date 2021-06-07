import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapData } from '../../interfaces';

export type SetMapPayload = MapData;

export type ErrorPayload = string;

export interface mapState {
  mapData: MapData;
  error: string;
}

const initialState = {
  mapData: [],
  error: '',
} as mapState;

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<SetMapPayload>) => {
      state.mapData = action.payload;
    },
    getMapAsync: () => {},
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

export type LineActions = ReturnType<
  | typeof mapSlice.actions.setMap
  | typeof mapSlice.actions.getMapAsync
  | typeof mapSlice.actions.error
  | typeof mapSlice.actions.resetError
  | typeof mapSlice.actions.pending
>;

export const { setMap, getMapAsync, error, resetError, pending } = mapSlice.actions;
export default mapSlice.reducer;
