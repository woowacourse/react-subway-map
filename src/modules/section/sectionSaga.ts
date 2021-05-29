import { call, put, takeLatest } from 'redux-saga/effects';
import { sectionAPI } from '../../api/section';
import {
  GetSectionAction,
  AddSectionAction,
  DeleteSectionAction,
  GetSectionResult,
  AddSectionResult,
  DeleteSectionResult,
} from '../../interfaces/section';

import { addSectionAsync, deleteSectionAsync, error, getSectionAsync, pending, setSection } from './sectionReducer';

export function* getSectionSaga(action: GetSectionAction) {
  yield put(pending());
  const result: GetSectionResult = yield call(sectionAPI.getSection, action.payload.id);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  yield put(setSection({ lineSection: result.lineSection }));
}

export function* addSectionSaga(action: AddSectionAction) {
  yield put(pending());
  const result: AddSectionResult = yield call(sectionAPI.addSection, action.payload);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  yield put(getSectionAsync({ id: Number(action.payload.lineId) }));
}

export function* deleteSectionSaga(action: DeleteSectionAction) {
  yield put(pending());
  const result: DeleteSectionResult = yield call(sectionAPI.deleteSection, action.payload);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  yield put(getSectionAsync({ id: Number(action.payload.lineId) }));
}

export function* sectionSaga() {
  yield takeLatest(getSectionAsync.type, getSectionSaga);
  yield takeLatest(addSectionAsync.type, addSectionSaga);
  yield takeLatest(deleteSectionAsync.type, deleteSectionSaga);
}
