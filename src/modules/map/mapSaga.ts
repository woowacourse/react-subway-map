import { mapAPI } from './../../api/map';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { error, getMapAsync, pending, setMap } from './mapReducer';
import { HttpResponse, MapData } from '../../interfaces';

export function* getMapSaga() {
  yield put(pending());
  const result: HttpResponse<MapData> = yield call(mapAPI.getMap);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(setMap(result.data));
}

export function* mapSaga() {
  yield takeLatest(getMapAsync.type, getMapSaga);
}
