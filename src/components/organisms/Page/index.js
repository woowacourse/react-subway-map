import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logout } from '../../../redux/userSlice';

import { NavBar, ServerSelect } from '../..';
import { Header, ServerSelectButton, Main } from './style';
import { ROUTE, SERVER_LIST } from '../../../constants';

export const Page = (props) => {
  const { server, setServer, children, ...rest } = props;

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleServerSubmit = (e) => {
    e.preventDefault();

    const currentId = e.target.serverSelect.value;

    if (!currentId) return;
    if (currentId === server.id) {
      setIsServerSelectOpen(false);
      return;
    }

    const currentServer = SERVER_LIST[currentId];

    setServer(() => ({
      id: currentServer.id,
      nickname: currentServer.nickname,
      endpoint: currentServer.endpoint,
    }));
    setIsServerSelectOpen(false);
    dispatch(logout());
    history.push(ROUTE.LOGIN);
  };

  const handleServerSelectButtonClick = () => {
    setIsServerSelectOpen(true);
  };

  return (
    <>
      <Header>
        <NavBar serverOwner={server.nickname} />
      </Header>

      <Main {...rest}>{children}</Main>

      <ServerSelectButton onClick={() => handleServerSelectButtonClick(server)}>서버 선택</ServerSelectButton>
      {isServerSelectOpen && <ServerSelect serverId={server.id} onSubmit={handleServerSubmit} />}
    </>
  );
};

Page.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    nickname: PropTypes.string,
    endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
  setServer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
