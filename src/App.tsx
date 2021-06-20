import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import subwayVideo from './assets/video/subwayBackground.mp4';
import { Button, Main, Menu, RootContainer, Title } from './components/atoms';
import { HostSelect } from './components/molecules';
import Routes from './components/molecules/Routes/Routes';
import { ROUTE } from './constants';
import { initialState as initialAccessToken, setAccessToken } from './features/accessTokenSlice';
import { getSignedUserAsync } from './features/signedUserSlice';
import { RootState, useAppDispatch } from './store';

const App = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    signedUserState,
    accessTokenState: { accessToken },
    hostState: { host },
  } = useSelector((state: RootState) => ({
    signedUserState: state.signedUserReducer,
    accessTokenState: state.accessTokenReducer,
    hostState: state.hostReducer,
  }));

  const isAuthed = !!signedUserState.id;

  useEffect(() => {
    if (signedUserState?.isError === true) {
      dispatch(setAccessToken(initialAccessToken));
    }
  }, [signedUserState]);

  useEffect(() => {
    dispatch(getSignedUserAsync({ host, accessToken }));
  }, []);

  const LoginedMenu = (
    <>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.STATION })}
      >
        🚇 역 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.LINE })}
      >
        🚇 노선 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.SECTION })}
      >
        🚇 구간 관리
      </Button>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => {
          history.replace({ pathname: ROUTE.LOGOUT });
        }}
      >
        🔒 로그아웃
      </Button>
    </>
  );

  const UnLoginedMenu = (
    <>
      <Button
        type="button"
        buttonTheme="menu"
        onClick={() => history.push({ pathname: ROUTE.LOGIN })}
      >
        🔑 로그인
      </Button>
    </>
  );

  return (
    <RootContainer>
      {/* <Video src={subwayVideo} loop autoPlay muted /> */}
      <Title>
        <Link to={ROUTE.HOME}>지하철 노선도</Link>
      </Title>
      <Menu>{signedUserState.id ? LoginedMenu : UnLoginedMenu}</Menu>
      <Main>
        <Routes isAuthed={isAuthed} />
      </Main>
      <HostSelect />
    </RootContainer>
  );
};

export default App;
