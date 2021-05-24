import { signIn } from './../../api/api';
import { loginAsync, login } from './userReducer';
import { call, takeLatest, put } from 'redux-saga/effects';
import { RESPONSE } from '../../constants/api';

type LoginAction = {
  type: typeof loginAsync.type;
  payload: {
    email: string;
    password: string;
  };
};

function* loginSaga(action: LoginAction) {
  const result: string = yield call(signIn, action.payload);
  if (result === RESPONSE.FAILURE) {
    return;
  }
  yield put(login({ email: action.payload.email, accessToken: result }));
}

export function* userSaga() {
  yield takeLatest(loginAsync.type, loginSaga);
}
