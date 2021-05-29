import { addStationAsync, deleteStationAsync, error, setStations } from '../modules/station/stationReducer';

// state
export interface StationLineState {
  id: number;
  name: string;
  color: string;
}
export interface StationState {
  stations: {
    id: number;
    name: string;
    lines: StationLineState[];
  }[];
  error: string;
}

// action
export interface SetStationAction {
  type: typeof setStations;
  payload: {
    stations: StationState['stations'];
  };
}

export interface AddStationAction {
  type: typeof addStationAsync;
  payload: {
    name: string;
  };
}

export interface DeleteStationAction {
  type: typeof deleteStationAsync;
  payload: {
    id: number;
  };
}

export interface ErrorAction {
  type: typeof error;
  payload: {
    error: string;
  };
}

// responseResult
export interface GetStationResult {
  error: StationState['error'];
  stations: StationState['stations'];
}

export interface AddStationResult {
  error: StationState['error'];
  station: {
    id: number;
    name: string;
  };
}

export interface DeleteStationResult {
  error: StationState['error'];
}
