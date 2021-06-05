import { call, takeLatest, put, select } from 'redux-saga/effects';
import { RootState } from '..';
import { stationAPI } from '../../api/station';
import { setStations, getStationsAsync, error, pending, addStationAsync, deleteStationAsync } from './stationReducer';
import {
  AddStationAction,
  AddStationResult,
  DeleteStationAction,
  DeleteStationResult,
  GetStationResult,
  StationState,
} from '../../interfaces/station';
import { HTTPResponse } from '../../interfaces';

export const selectStations = (state: RootState) => state.station.stations;

export function* getStationsSaga() {
  yield put(pending());
  const result: HTTPResponse<GetStationResult> = yield call(stationAPI.getStations);

  if (!result.success) {
    yield put(error({ error: result.message }));
    return;
  }

  yield put(setStations({ stations: result.data.stations }));
}

export function* addStationSaga(action: AddStationAction) {
  yield put(pending());
  const result: HTTPResponse<AddStationResult> = yield call(stationAPI.addStation, action.payload.name);

  if (!result.success) {
    yield put(error({ error: result.message }));
    return;
  }

  const stations: StationState['stations'] = yield select(selectStations);
  yield put(setStations({ stations: [Object.assign(result.data.station, { lines: [] }), ...stations] }));
}

export function* deleteStationSaga(action: DeleteStationAction) {
  yield put(pending());
  const result: HTTPResponse<DeleteStationResult> = yield call(stationAPI.deleteStation, action.payload.id);

  if (!result.success) {
    yield put(error({ error: result.message }));
    return;
  }

  const stations: StationState['stations'] = yield select(selectStations);
  yield put(setStations({ stations: stations.filter(station => station.id !== action.payload.id) }));
}

export function* stationSaga() {
  yield takeLatest(getStationsAsync.type, getStationsSaga);
  yield takeLatest(addStationAsync.type, addStationSaga);
  yield takeLatest(deleteStationAsync.type, deleteStationSaga);
}
