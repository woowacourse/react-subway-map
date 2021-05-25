import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import stationReducer from './station/stationReducer';
import { userSaga } from './user/userSaga';
import { stationSaga } from './station/stationSaga';
import lineReducer from './line/lineReducer';
import { lineSaga } from './line/lineSaga';

export const rootReducer = combineReducers({ user: userReducer, station: stationReducer, line: lineReducer });

export function* rootSaga() {
  yield all([userSaga(), stationSaga(), lineSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
