import { HttpResponse } from './../../interfaces/request';
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

export const selectLines = (state: RootState) => state.line.lines;

export function* getLinesSaga() {
  yield put(pending());
  const response: HttpResponse<Line[]> = yield call(lineAPI.getLines);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  yield put(setLines(response.data));
}

export function* addLineSaga(action: PayloadAction<AddLinePayload>) {
  yield put(pending());
  const response: HttpResponse<Line> = yield call(lineAPI.addLine, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  const lines: Line[] = yield select(selectLines);

  yield put(setLines([...lines, response.data]));
}

export function* deleteLineSaga(action: PayloadAction<DeleteLinePayload>) {
  yield put(pending());
  const response: HttpResponse = yield call(lineAPI.deleteLine, action.payload);

  if (response.error) {
    yield put(error(response.error));
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
