import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import subwayVideo from './assets/video/subwayBackground.mp4';
import { Main, Menu, RootContainer, Title } from './components/atoms';
import { HostSelect, Links } from './components/molecules';
import Routes from './components/molecules/Routes/Routes';
import { ROUTE } from './constants';
import { initialState as initialAccessToken, setAccessToken } from './modules/accessTokenSlice';
import { getSignedUserAsync } from './modules/signedUserSlice';
import { RootState, useAppDispatch } from './store';

const App = () => {
  const dispatch = useAppDispatch();

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

  return (
    <RootContainer>
      {/* <Video src={subwayVideo} loop autoPlay muted /> */}
      <Title>
        <Link to={ROUTE.HOME}>지하철 노선도</Link>
      </Title>
      <Menu>
        <Links isAuthed={isAuthed} />
      </Menu>
      <Main>
        <Routes isAuthed={isAuthed} />
      </Main>
      <HostSelect />
    </RootContainer>
  );
};

export default App;
