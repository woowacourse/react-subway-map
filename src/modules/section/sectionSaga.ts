import { HttpResponse } from './../../interfaces/request';
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

export function* getSectionSaga(action: PayloadAction<GetLineSectionPayload>) {
  yield put(pending());
  const response: HttpResponse<LineSection> = yield call(sectionAPI.getSection, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  yield put(setLineSection(response.data));
}

export function* addSectionSaga(action: PayloadAction<AddSectionPayload>) {
  yield put(pending());
  const response: HttpResponse = yield call(sectionAPI.addSection, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  yield put(getLineSectionAsync(Number(action.payload.lineId)));
}

export function* deleteSectionSaga(action: PayloadAction<DeleteSectionPayload>) {
  yield put(pending());
  const response: HttpResponse = yield call(sectionAPI.deleteSection, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  yield put(getLineSectionAsync(Number(action.payload.lineId)));
}

export function* sectionSaga() {
  yield takeLatest(getLineSectionAsync.type, getSectionSaga);
  yield takeLatest(addSectionAsync.type, addSectionSaga);
  yield takeLatest(deleteSectionAsync.type, deleteSectionSaga);
}
