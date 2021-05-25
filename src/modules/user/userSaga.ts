import { signIn } from './../../api/api';
import { loginAsync, login, error, pending } from './userReducer';
import { call, takeLatest, put } from 'redux-saga/effects';
import { RESPONSE } from '../../constants/api';

type LoginAction = {
  type: typeof loginAsync.type;
  payload: {
    email: string;
    password: string;
  };
};
interface Result {
  error: string;
  accessToken: string;
}

function* loginSaga(action: LoginAction) {
  yield put(pending());
  const result: Result = yield call(signIn, action.payload);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(login({ email: action.payload.email, accessToken: result.accessToken }));
}

export function* userSaga() {
  yield takeLatest(loginAsync.type, loginSaga);
}
