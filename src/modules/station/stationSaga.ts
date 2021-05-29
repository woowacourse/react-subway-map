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

export const selectStations = (state: RootState) => state.station.stations;

export function* getStationsSaga() {
  yield put(pending());
  const result: GetStationResult = yield call(stationAPI.getStations);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  yield put(setStations({ stations: result.stations }));
}

export function* addStationSaga(action: AddStationAction) {
  yield put(pending());
  const result: AddStationResult = yield call(stationAPI.addStation, action.payload.name);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  const stations: StationState['stations'] = yield select(selectStations);
  yield put(setStations({ stations: [Object.assign(result.station, { lines: [] }), ...stations] }));
}

export function* deleteStationSaga(action: DeleteStationAction) {
  yield put(pending());
  const result: DeleteStationResult = yield call(stationAPI.deleteStation, action.payload.id);

  if (result.error) {
    yield put(error({ error: result.error }));
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
