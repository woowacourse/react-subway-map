import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainImage from '../../../assets/img/subway.png';
import { GUIDE_MESSAGE } from '../../../constants';

import { selectSignedUser, getSignedUserAsync } from '../../../features/signedUserSlice';
import { useAppDispatch } from '../../../store';
import { Container } from './Home.styles';

const Home = () => {
  const dispatch = useAppDispatch();
  const signedUser = useSelector(selectSignedUser);

  const guideMessage = signedUser.email ? GUIDE_MESSAGE.AFTER_LOGIN : GUIDE_MESSAGE.BEFORE_LOGIN;

  useEffect(() => {
    dispatch(getSignedUserAsync(signedUser.accessToken));
  }, []);

  return (
    <Container>
      <img src={MainImage} />
      <p>{guideMessage}</p>
    </Container>
  );
};

export default Home;
