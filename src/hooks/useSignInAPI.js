import { useState } from 'react';
import { request } from '../utils';

const useSignInAPI = () => {
  const [failMessage, setFailMessage] = useState(null);

  const signIn = async ({ email, password }) => {
    try {
      const response = await request.post('/login/token', { email, password });

      if (response.status !== 200) {
        setFailMessage('이메일 혹은 비밀번호를 다시 확인해주세요.');

        return;
      }

      // const { accessToken } = response.data;
    } catch (error) {
      console.error(error);

      // TODO: 네트워크 에러 페이지 컴포넌트 만들기
      // history.push(ROUTE.SIGN_IN.PATH);
    }
  };

  return { signIn, failMessage };
};

export default useSignInAPI;
