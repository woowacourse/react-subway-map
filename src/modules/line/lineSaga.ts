import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { lineAPI } from '../../api/line';
import { AddLine, Line } from '../../interfaces';
import { error, getLinesAsync, addLineAsync, pending, setLines } from './lineReducer';

interface AddLineAction {
  type: typeof addLineAsync;
  payload: {
    line: AddLine;
  };
}
interface GetLineResult {
  error: string;
  lines: Line[];
}

interface AddLineResult {
  error: string;
  line: Line;
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

function* addLineSaga(action: AddLineAction) {
  yield put(pending());
  const result: AddLineResult = yield call(lineAPI.addLine, action.payload.line);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  const lines: Line[] = yield select(state => state.line.lines);

  yield put(setLines({ lines: [...lines, result.line] }));
}

export function* lineSaga() {
  yield takeLatest(getLinesAsync.type, getLinesSaga);
  yield takeLatest(addLineAsync.type, addLineSaga);
}
