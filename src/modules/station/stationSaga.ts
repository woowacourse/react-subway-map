import { setStations, getStationsAsync, error, pending } from './stationReducer';
import { call, takeLatest, put } from 'redux-saga/effects';
import { stationAPI } from '../../api/station';
import { Station } from '../../interfaces';

interface GetStationResult {
  error: string;
  stations: Station[];
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

export function* stationSaga() {
  yield takeLatest(getStationsAsync.type, getStationsSaga);
}
