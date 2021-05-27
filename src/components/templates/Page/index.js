import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useCookies } from 'react-cookie';

import { logout } from '../../../redux/userSlice';
import { clearStation } from '../../../redux/stationSlice';
import { clearLine } from '../../../redux/lineSlice';
import { NavBar, ServerSelect } from '../..';
import { Header, ServerSelectButton, Main } from './style';
import { ROUTE, SERVER_LIST, SERVER_ID, ACCESS_TOKEN } from '../../../constants';

export const Page = (props) => {
  const { serverId, setServerId, children, ...rest } = props;

  const dispatch = useDispatch();

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(!serverId);
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies([SERVER_ID]);

  const handleServerSubmit = (e) => {
    e.preventDefault();

    const selectedId = e.target.serverSelect.value;

    if (!selectedId) return;
    if (selectedId === serverId) {
      setIsServerSelectOpen(false);
      return;
    }
    setServerId(selectedId);
    setCookie(SERVER_ID, selectedId);

    dispatch(logout());
    removeCookie(ACCESS_TOKEN);
    dispatch(clearLine());
    dispatch(clearStation());

    setIsServerSelectOpen(false);
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
