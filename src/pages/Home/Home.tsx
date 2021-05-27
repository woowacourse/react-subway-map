import { Redirect } from 'react-router';
import { ROUTE } from '../../constants/constant';
import useUser from '../../hook/useUser';
import * as S from './Home.styles';

const Home = () => {
  const { accessToken, email } = useUser();

  if (!accessToken) {
    return <Redirect to={ROUTE.SIGN_IN} />;
  }

  return <S.Container>{email}님! RUNNINGMAP에 오신 것을 환영합니다.</S.Container>;
};

export default Home;
