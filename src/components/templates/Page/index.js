import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logout } from '../../../redux/userSlice';

import { NavBar, ServerSelect } from '../..';
import { Header, ServerSelectButton, Main } from './style';
import { ROUTE, SERVER_LIST } from '../../../constants';

export const Page = (props) => {
  const { hasStoredServerId, serverId, setServerId, children, ...rest } = props;

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(!hasStoredServerId);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleServerSubmit = (e) => {
    e.preventDefault();

    const selectedId = e.target.serverSelect.value;

    if (!selectedId) return;
    if (selectedId === serverId) {
      setIsServerSelectOpen(false);
      return;
    }
    setServerId(selectedId);
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
        <NavBar serverOwner={SERVER_LIST[serverId]?.nickname} />
      </Header>

      <Main {...rest}>{children}</Main>

      <ServerSelectButton onClick={handleServerSelectButtonClick}>서버선택</ServerSelectButton>
      {isServerSelectOpen && <ServerSelect serverId={serverId} onSubmit={handleServerSubmit} />}
    </>
  );
};

Page.propTypes = {
  serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setServerId: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
