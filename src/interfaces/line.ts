import { addLineAsync, deleteLineAsync, error, setLines } from '../modules/line/lineReducer';

// state
interface LineLinesState {
  id: number;
  name: string;
  color: string;
}

export interface LineState {
  lines: LineLinesState[];
  error: string;
}

// action
export interface SetLineAction {
  type: typeof setLines;
  payload: {
    lines: LineLinesState[];
  };
}

export interface AddLineAction {
  type: typeof addLineAsync;
  payload: {
    line: {
      name: string;
      color: string;
      upStationId: string;
      downStationId: string;
      distance: string;
    };
  };
}

export interface DeleteLineAction {
  type: typeof deleteLineAsync;
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

// result
export interface GetLineResult {
  error: string;
  lines: LineLinesState[];
}

export interface AddLineResult {
  error: string;
  line: LineLinesState;
}

export interface DeleteLineResult {
  error: string;
}
