import { setStations, getStationsAsync, error, pending, addStationAsync, deleteStationAsync } from './stationReducer';
import { call, takeLatest, put, select } from 'redux-saga/effects';
import { stationAPI } from '../../api/station';
import { Station } from '../../interfaces';

interface GetStationResult {
  error: string;
  stations: Station[];
}

interface AddStationAction {
  type: typeof addStationAsync;
  payload: {
    name: string;
  };
}

interface AddStationResult {
  error: string;
  station: {
    id: number;
    name: string;
  };
}

interface DeleteStationAction {
  type: typeof deleteStationAsync;
  payload: {
    id: number;
  };
}

interface DeleteStationResult {
  error: string;
}

function* getStationsSaga() {
  yield put(pending());
  const result: GetStationResult = yield call(stationAPI.getStations);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(setStations({ stations: result.stations }));
}

function* addStationSaga(action: AddStationAction) {
  yield put(pending());
  const result: AddStationResult = yield call(stationAPI.addStation, action.payload.name);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  const stations: Station[] = yield select(state => state.station.stations);

  yield put(setStations({ stations: [Object.assign(result.station, { lines: [] }), ...stations] }));
}

function* deleteStationSaga(action: DeleteStationAction) {
  yield put(pending());
  const result: DeleteStationResult = yield call(stationAPI.deleteStation, action.payload.id);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  const stations: Station[] = yield select(state => state.station.stations);
  yield put(setStations({ stations: stations.filter(station => station.id !== action.payload.id) }));
}

export function* stationSaga() {
  yield takeLatest(getStationsAsync.type, getStationsSaga);
  yield takeLatest(addStationAsync.type, addStationSaga);
  yield takeLatest(deleteStationAsync.type, deleteStationSaga);
}
