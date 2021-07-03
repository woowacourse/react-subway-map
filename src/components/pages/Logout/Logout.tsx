import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ROUTE } from '../../../constants';
import {
  initialState as accessTokenInitialState,
  setAccessToken,
} from '../../../modules/accessTokenSlice';
import {
  initialState as signedUserInitialState,
  setSignedUser,
} from '../../../modules/signedUserSlice';
import { RootState, useAppDispatch } from '../../../store';
import Home from '../Home/Home';

const Logout = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    signedUser: { id: signedUserId },
  } = useSelector((state: RootState) => ({
    signedUser: state.signedUserReducer,
  }));

  useEffect(() => {
    if (signedUserId) {
      window.alert('로그아웃 되었습니다.');
    }

    dispatch(setAccessToken(accessTokenInitialState));
    dispatch(setSignedUser(signedUserInitialState));

    history.replace({ pathname: ROUTE.HOME });
  }, []);

  return <Home />;
};

export default Logout;
