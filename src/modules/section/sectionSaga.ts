import { call, put, takeLatest } from 'redux-saga/effects';
import { sectionAPI } from '../../api/section';

import {
  addSectionAsync,
  deleteSectionAsync,
  error,
  pending,
  setLineSection,
  GetLineSectionPayload,
  AddSectionPayload,
  DeleteSectionPayload,
  getLineSectionAsync,
} from './sectionReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { LineSection } from '../../interfaces/section';

interface GetLineSectionResult {
  error: string;
  lineSection: LineSection;
}

interface AddSectionResult {
  error: string;
}

interface DeleteSectionResult {
  error: string;
}

export function* getSectionSaga(action: PayloadAction<GetLineSectionPayload>) {
  yield put(pending());
  const result: GetLineSectionResult = yield call(sectionAPI.getSection, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(setLineSection(result.lineSection));
}

export function* addSectionSaga(action: PayloadAction<AddSectionPayload>) {
  yield put(pending());
  const result: AddSectionResult = yield call(sectionAPI.addSection, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(getLineSectionAsync(Number(action.payload.lineId)));
}

export function* deleteSectionSaga(action: PayloadAction<DeleteSectionPayload>) {
  yield put(pending());
  const result: DeleteSectionResult = yield call(sectionAPI.deleteSection, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(getLineSectionAsync(Number(action.payload.lineId)));
}

export function* sectionSaga() {
  yield takeLatest(getLineSectionAsync.type, getSectionSaga);
  yield takeLatest(addSectionAsync.type, addSectionSaga);
  yield takeLatest(deleteSectionAsync.type, deleteSectionSaga);
}
