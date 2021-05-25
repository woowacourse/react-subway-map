import { authAPI } from '../../api/auth';
import { loginAsync, login, error, pending } from './userReducer';
import { call, takeLatest, put } from 'redux-saga/effects';

type LoginAction = {
  type: typeof loginAsync.type;
  payload: {
    email: string;
    password: string;
  };
};
interface LoginResult {
  error: string;
  accessToken: string;
}

function* loginSaga(action: LoginAction) {
  yield put(pending());
  const result: LoginResult = yield call(authAPI.signIn, action.payload);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(login({ email: action.payload.email, accessToken: result.accessToken }));
}

export function* userSaga() {
  yield takeLatest(loginAsync.type, loginSaga);
}
