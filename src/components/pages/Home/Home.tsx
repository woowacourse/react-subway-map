import { useSelector } from 'react-redux';
import MainImage from '../../../assets/img/subway.png';
import { GUIDE_MESSAGE } from '../../../constants';

import { selectSignedUser } from '../../../features/signedUserSlice';
import { Container } from './Home.styles';

const Home = () => {
  const signedUser = useSelector(selectSignedUser);
  const guideMessage = signedUser.accessToken
    ? GUIDE_MESSAGE.AFTER_LOGIN
    : GUIDE_MESSAGE.BEFORE_LOGIN;

  return (
    <Container>
      <img src={MainImage} />
      <p>{guideMessage}</p>
    </Container>
  );
};

export default Home;
