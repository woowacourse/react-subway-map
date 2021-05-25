import { useHistory } from 'react-router';
import { ROUTE } from '../constants';
import { request } from '../utils';

const useSignUpAPI = () => {
  const history = useHistory();

  const checkDuplicateEmail = async (email) => {
    //TODO: 중복 처리
  };

  const signUp = async ({ email, age, password }) => {
    try {
      await request.post('/members', { email, age, password });

      history.push(ROUTE.SIGN_IN.PATH);
    } catch (error) {
      console.error(error);

      // TODO: 네트워크 에러 페이지 컴포넌트 만들기
      // history.push(ROUTE.SIGN_IN.PATH);
    }
  };

  return { checkDuplicateEmail, signUp };
};

export default useSignUpAPI;
