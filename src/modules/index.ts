import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import { userSaga } from './user/userSaga';

export const rootReducer = combineReducers({ user: userReducer });

export function* rootSaga() {
  yield all([userSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
