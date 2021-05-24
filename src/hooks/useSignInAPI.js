import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { LS_KEY, ROUTE } from '../constants';
import { setToken } from '../redux';
import { request, setLocalStorage } from '../utils';

const useSignInAPI = () => {
  const [failMessage, setFailMessage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const signIn = async ({ email, password }) => {
    try {
      const response = await request.post('/login/token', { email, password });

      if (response.status !== 200) {
        setFailMessage('이메일 혹은 비밀번호를 다시 확인해주세요.');

        return;
      }

      const { accessToken } = response.data;

      setLocalStorage(LS_KEY.TOKEN, accessToken);
      dispatch(setToken({ token: accessToken }));
      history.push(ROUTE.HOME.PATH);
    } catch (error) {
      console.error(error);

      // TODO: 네트워크 에러 페이지 컴포넌트 만들기
      // history.push(ROUTE.SIGN_IN.PATH);
    }
  };

  return { signIn, failMessage };
};

export default useSignInAPI;
