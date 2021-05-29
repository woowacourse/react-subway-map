import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { lineAPI } from '../../api/line';
import { Line } from '../../interfaces/line';
import {
  error,
  getLinesAsync,
  addLineAsync,
  pending,
  setLines,
  deleteLineAsync,
  AddLinePayload,
  DeleteLinePayload,
} from './lineReducer';
interface GetLineResult {
  error: string;
  lines: Line[];
}

interface AddLineResult {
  error: string;
  line: Line;
}

interface deleteLineResult {
  error: string;
}

export const selectLines = (state: RootState) => state.line.lines;

export function* getLinesSaga() {
  yield put(pending());
  const result: GetLineResult = yield call(lineAPI.getLines);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(setLines(result.lines));
}

export function* addLineSaga(action: PayloadAction<AddLinePayload>) {
  yield put(pending());
  const result: AddLineResult = yield call(lineAPI.addLine, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  const lines: Line[] = yield select(selectLines);

  yield put(setLines([...lines, result.line]));
}

export function* deleteLineSaga(action: PayloadAction<DeleteLinePayload>) {
  yield put(pending());
  const result: deleteLineResult = yield call(lineAPI.deleteLine, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  const lines: Line[] = yield select(selectLines);

  yield put(setLines(lines.filter(line => line.id !== Number(action.payload))));
}

export function* lineSaga() {
  yield takeLatest(getLinesAsync.type, getLinesSaga);
  yield takeLatest(addLineAsync.type, addLineSaga);
  yield takeLatest(deleteLineAsync.type, deleteLineSaga);
}
