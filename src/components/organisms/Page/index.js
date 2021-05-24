import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { NavBar, ServerSelect } from '../..';
import { Header, ServerSelectButton, Main } from './style';
import { ROUTE, SERVER_LIST } from '../../../constants';

export const Page = (props) => {
  const { server, setServer, children, ...rest } = props;

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(false);
  const history = useHistory();

  const handleServerChange = (e) => {
    const id = e.target.value;
    const server = SERVER_LIST[id];

    setServer(() => ({ id: server.id, endPoint: server.endpoint }));
  };

  const handleServerSubmit = (e) => {
    e.preventDefault();

    if (!server.id) {
      return;
    }

    setIsServerSelectOpen(false);
    history.push(ROUTE.STATION);
  };

  const handleServerSelectButtonClick = () => {
    setIsServerSelectOpen(true);
  };

  return (
    <>
      <Header>
        <NavBar />
      </Header>

      <Main {...rest}>{children}</Main>

      <ServerSelectButton onClick={() => handleServerSelectButtonClick(server)}>서버 선택</ServerSelectButton>
      {isServerSelectOpen && (
        <ServerSelect serverId={server.id} onChange={handleServerChange} onSubmit={handleServerSubmit} />
      )}
    </>
  );
};

Page.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    endPoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
  setServer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
