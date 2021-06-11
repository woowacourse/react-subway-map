import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import stationReducer from './station/stationReducer';
import { userSaga } from './user/userSaga';
import { stationSaga } from './station/stationSaga';
import lineReducer from './line/lineReducer';
import { lineSaga } from './line/lineSaga';
import { PayloadAction } from '@reduxjs/toolkit';
import { sectionSaga } from './section/sectionSaga';
import sectionReducer from './section/sectionReducer';
import mapReducer from './map/mapReducer';
import { mapSaga } from './map/mapSaga';

const combinedReducer = combineReducers({
  user: userReducer,
  station: stationReducer,
  line: lineReducer,
  section: sectionReducer,
  map: mapReducer,
});

type CombinedState = ReturnType<typeof combinedReducer> | undefined;

export const rootReducer = (state: CombinedState, action: PayloadAction) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export function* rootSaga() {
  yield all([userSaga(), stationSaga(), lineSaga(), sectionSaga(), mapSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
