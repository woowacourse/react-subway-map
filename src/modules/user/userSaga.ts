import { authAPI } from '../../api/auth';
import { loginAsync, login, error, pending } from './userReducer';
import { call, takeLatest, put } from 'redux-saga/effects';
import { HTTPResponse } from '../../interfaces';
import { LoginResult, LoginAction } from '../../interfaces/auth';

export function* loginSaga(action: LoginAction) {
  yield put(pending());
  const result: HTTPResponse<LoginResult> = yield call(authAPI.signIn, action.payload);

  if (!result.success) {
    yield put(error({ error: result.message }));
    return;
  }
  yield put(login({ email: action.payload.email, accessToken: result.data.accessToken }));
}

export function* userSaga() {
  yield takeLatest(loginAsync.type, loginSaga);
}
