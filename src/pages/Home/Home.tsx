import { Redirect } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import { ROUTE } from '../../constants/constant';
import useUser from '../../hook/useUser';
import * as S from './Home.styles';

const Home = () => {
  const { accessToken, email } = useUser();

  if (!accessToken) {
    return <Redirect to={ROUTE.SIGN_IN} />;
  }

  return (
    <S.Home>
      <ContentContainer hasHat={true}>
        <S.Container>
          <S.Emoji>🚇</S.Emoji>
          <S.User>{email}님!</S.User> <S.Text>RUNNINGMAP에 오신 것을 환영합니다.</S.Text>
        </S.Container>
      </ContentContainer>
    </S.Home>
  );
};

export default Home;
