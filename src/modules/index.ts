import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import stationReducer from './station/stationReducer';
import { userSaga } from './user/userSaga';
import { stationSaga } from './station/stationSaga';

export const rootReducer = combineReducers({ user: userReducer, station: stationReducer });

export function* rootSaga() {
  yield all([userSaga(), stationSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
