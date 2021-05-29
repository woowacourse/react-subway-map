import { authAPI } from '../../api/auth';
import { loginAsync, login, error, pending } from './userReducer';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SignInRequest } from '../../interfaces/auth';

interface LoginResult {
  error: string;
  accessToken: string;
}

export function* loginSaga(action: PayloadAction<SignInRequest>) {
  yield put(pending());
  const result: LoginResult = yield call(authAPI.signIn, action.payload);

  if (result.error) {
    yield put(error(result.error));
    return;
  }
  yield put(login({ email: action.payload.email, accessToken: result.accessToken }));
}

export function* userSaga() {
  yield takeLatest(loginAsync.type, loginSaga);
}
