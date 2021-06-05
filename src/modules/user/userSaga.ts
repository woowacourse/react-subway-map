import { authAPI } from '../../api/auth';
import { loginAsync, login, error, pending } from './userReducer';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SignInRequest } from '../../interfaces/auth';
import { HttpResponse } from './../../interfaces/request';

export function* loginSaga(action: PayloadAction<SignInRequest>) {
  yield put(pending());
  const response: HttpResponse<string> = yield call(authAPI.signIn, action.payload);

  if (response.error) {
    yield put(error(response.error));
    return;
  }
  yield put(login({ email: action.payload.email, accessToken: response.data }));
}

export function* userSaga() {
  yield takeLatest(loginAsync.type, loginSaga);
}
