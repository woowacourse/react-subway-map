import { AddSectionPayload } from './../../interfaces/index';
import { call, put, takeLatest } from 'redux-saga/effects';
import { sectionAPI } from '../../api/section';
import { LineSection } from '../../interfaces';
import { getStationsAsync } from '../station/stationReducer';
import { addSectionAsync, error, getSectionAsync, pending, setSection } from './sectionReducer';

interface GetSectionAction {
  type: typeof getSectionAsync;
  payload: {
    id: LineSection['id'];
  };
}

interface AddSectionAction {
  type: typeof addSectionAsync;
  payload: AddSectionPayload;
}

interface GetLineResult {
  error: string;
  lineSection: LineSection;
}

interface AddLineResult {
  error: string;
}

function* getSectionSaga(action: GetSectionAction) {
  yield put(pending());
  const result: GetLineResult = yield call(sectionAPI.getSection, action.payload.id);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(setSection({ lineSection: result.lineSection }));
}

function* addSectionSaga(action: AddSectionAction) {
  yield put(pending());
  const result: AddLineResult = yield call(sectionAPI.addSection, action.payload);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(getSectionAsync({ id: Number(action.payload.lineId) }));
}

export function* sectionSaga() {
  yield takeLatest(getSectionAsync.type, getSectionSaga);
  yield takeLatest(addSectionAsync.type, addSectionSaga);
}
