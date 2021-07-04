import { PropTypes } from 'prop-types';
import React from 'react';

import { SERVER_LIST } from '../../../constants';
import useServer from '../../../hooks/useServer';
import { NavBar, ServerSelect } from '../..';
import { Header, Main, ServerSelectButton } from './style';

export const Page = (props) => {
  const { children } = props;

  const { handleOpenModal, handleServerSubmit, isServerSelectOpen, serverId } = useServer();

  return (
    <>
      <Header>
        <NavBar serverOwner={SERVER_LIST[serverId]?.nickname} />
      </Header>

      <Main>{children}</Main>

      <ServerSelectButton onClick={handleOpenModal}>서버선택</ServerSelectButton>
      {isServerSelectOpen && <ServerSelect serverId={serverId} onSubmit={handleServerSubmit} />}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
