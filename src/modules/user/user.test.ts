import { call } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { loginSaga } from './userSaga';
import userReducer, { pending, login, loginAsync, error } from './userReducer';
import { authAPI } from '../../api/auth';

const userInfo = { email: '1234@gmail.com', password: '1234' };
const userAccessToken = 'ThisIsMockAccessToken';

it('로그인에 성공한다', () => {
  return expectSaga(loginSaga, { type: loginAsync.type, payload: userInfo })
    .withReducer(userReducer)
    .put(pending())
    .provide([[call(authAPI.signIn, userInfo), { accessToken: userAccessToken }]])
    .put(login({ email: userInfo.email, accessToken: userAccessToken }))
    .hasFinalState({
      serverName: '',
      baseURL: '',
      email: userInfo.email,
      accessToken: userAccessToken,
      error: '',
    })
    .run();
});

it('로그인에 실패한다', () => {
  const errorMessage = '에러 메세지';
  return expectSaga(loginSaga, { type: loginAsync.type, payload: userInfo })
    .withReducer(userReducer)
    .put(pending())
    .provide([[call(authAPI.signIn, userInfo), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({
      serverName: '',
      baseURL: '',
      email: '',
      accessToken: '',
      error: errorMessage,
    })
    .run();
});
