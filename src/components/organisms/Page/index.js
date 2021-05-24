import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { NavBar, ServerSelect } from '../..';
import { ServerSelectButton } from './style';
import { ROUTE, SERVER_LIST } from '../../../constants';

export const Page = (props) => {
  const { children, ...rest } = props;

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(false);
  const [server, setServer] = useState({ id: null, endPoint: null });
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

  const handleServerSelectButtonClick = (server) => {
    setIsServerSelectOpen(true);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>

      <section {...rest}>{children}</section>

      <ServerSelectButton onClick={() => handleServerSelectButtonClick(server)}>서버 선택</ServerSelectButton>
      {isServerSelectOpen && (
        <ServerSelect serverId={server.id} onChange={handleServerChange} onSubmit={handleServerSubmit} />
      )}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
