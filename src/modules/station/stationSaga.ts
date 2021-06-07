import { HttpResponse } from './../../interfaces/request';
import {
  setStations,
  getStationsAsync,
  error,
  pending,
  addStationAsync,
  deleteStationAsync,
  AddStationPayload,
  DeleteStationPayload,
  editStationAsync,
  EditStationPayload,
} from './stationReducer';
import { call, takeLatest, put, select } from 'redux-saga/effects';
import { stationAPI } from '../../api/station';
import { Station } from '../../interfaces';
import { RootState } from '..';
import { PayloadAction } from '@reduxjs/toolkit';

export const selectStations = (state: RootState) => state.station.stations;

export function* getStationsSaga() {
  yield put(pending());
  const response: HttpResponse<Station[]> = yield call(stationAPI.getStations);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  yield put(setStations(response.data));
}

export function* addStationSaga(action: PayloadAction<AddStationPayload>) {
  yield put(pending());
  const response: HttpResponse<Station> = yield call(stationAPI.addStation, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }

  const stations: Station[] = yield select(selectStations);

  yield put(setStations([Object.assign(response.data, { lines: [] }), ...stations]));
}

export function* deleteStationSaga(action: PayloadAction<DeleteStationPayload>) {
  yield put(pending());
  const response: HttpResponse = yield call(stationAPI.deleteStation, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  const stations: Station[] = yield select(selectStations);
  yield put(setStations(stations.filter(station => station.id !== action.payload)));
}

export function* editStationSaga(action: PayloadAction<EditStationPayload>) {
  yield put(pending());
  const result: HttpResponse = yield call(stationAPI.editStation, action.payload.id, action.payload.name);

  if (result.error) {
    yield put(error(result.error));
    return;
  }

  yield put(getStationsAsync());
}

export function* stationSaga() {
  yield takeLatest(getStationsAsync.type, getStationsSaga);
  yield takeLatest(addStationAsync.type, addStationSaga);
  yield takeLatest(deleteStationAsync.type, deleteStationSaga);
  yield takeLatest(editStationAsync.type, editStationSaga);
}
