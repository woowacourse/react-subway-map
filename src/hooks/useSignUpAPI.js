import { useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTE } from '../constants';
import { request } from '../utils';

const useSignUpAPI = () => {
  const [duplicateEmailError, setDuplicateEmailError] = useState(null);
  const history = useHistory();

  const signUp = async ({ email, age, password }) => {
    try {
      const response = await request.post('/members', { email, age, password });

      // TODO: 중복 처리 반영되면 status code 변경
      if (response.status === 400) {
        setDuplicateEmailError(response.message);

        return;
      }

      history.push(ROUTE.SIGN_IN.PATH);
    } catch (error) {
      console.error(error);

      // TODO: 네트워크 에러 페이지 컴포넌트 만들기
      // history.push(ROUTE.SIGN_IN.PATH);
    }
  };

  return { duplicateEmailError, signUp };
};

export default useSignUpAPI;
