import { HTTPResponse } from '.';
import { addLineAsync, deleteLineAsync, error, setLines } from '../modules/line/lineReducer';

// state
interface LineLinesState {
  id: number;
  name: string;
  color: string;
}

export interface LineInfoState {
  name: string;
  color: string;
  upStationId: string;
  downStationId: string;
  distance: string;
}
export interface LineState {
  lines: LineLinesState[];
  error: HTTPResponse<null>['message'];
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
    line: LineInfoState;
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
    error: HTTPResponse<null>['message'];
  };
}

// result
export interface GetLineResult {
  lines: LineLinesState[];
}

export interface AddLineResult {
  line: LineLinesState;
}

export interface DeleteLineResult {}
