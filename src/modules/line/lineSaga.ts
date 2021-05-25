import { call, put, takeLatest } from '@redux-saga/core/effects';
import { lineAPI } from '../../api/line';
import { Line } from '../../interfaces';
import { error, getLinesAsync, pending, setLines } from './lineReducer';

interface GetLineResult {
  error: string;
  lines: Line[];
}

function* getLinesSaga() {
  yield put(pending());
  const result: GetLineResult = yield call(lineAPI.getLines);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(setLines({ lines: result.lines }));
}

export function* lineSaga() {
  yield takeLatest(getLinesAsync.type, getLinesSaga);
}
