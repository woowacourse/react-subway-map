import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import stationReducer from './station/stationReducer';
import { userSaga } from './user/userSaga';
import { stationSaga } from './station/stationSaga';
import lineReducer from './line/lineReducer';
import { lineSaga } from './line/lineSaga';
import { PayloadAction } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({ user: userReducer, station: stationReducer, line: lineReducer });
type CombinedState = ReturnType<typeof combinedReducer> | undefined;

export const rootReducer = (state: CombinedState, action: PayloadAction) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export function* rootSaga() {
  yield all([userSaga(), stationSaga(), lineSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
