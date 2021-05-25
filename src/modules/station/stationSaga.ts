import { setStations, getStationsAsync, error, pending, addStationAsync } from './stationReducer';
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

interface addStationResult {
  error: string;
  station: {
    id: number;
    name: string;
  };
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
  const result: addStationResult = yield call(stationAPI.addStation, action.payload.name);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }

  const stations: Station[] = yield select(state => state.station.stations);
  const newStations = [result.station, ...stations] as Station[];

  yield put(setStations({ stations: newStations }));
}

export function* stationSaga() {
  yield takeLatest(getStationsAsync.type, getStationsSaga);
  yield takeLatest(addStationAsync.type, addStationSaga);
}
