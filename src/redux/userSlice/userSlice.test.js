import { clearUserToken, getUserTokenThunk } from '.';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MOCK_SERVER } from '../../constants';
import store from '..';

const mock = new MockAdapter(axios);

it('로그인을 할 수 있다.', async () => {
  const mockUserData = { email: 'test@test.com', password: 'test1234!' };

  mock
    .onPost(`${MOCK_SERVER}/login/token`)
    .reply(200, { accessToken: 'mockAccessToken' });

  await store.dispatch(getUserTokenThunk({ params: mockUserData }));

  const { user } = store.getState();

  expect(user.token).toBeTruthy();
});

it('로그아웃을 할 수 있다.', () => {
  store.dispatch(clearUserToken());

  const { user } = store.getState();

  expect(user.token).toBeNull();
});
