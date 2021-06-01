import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import { useCookie, useLogin } from '../../../hooks';
import { clearStation } from '../../../redux/stationSlice';
import { clearLine } from '../../../redux/lineSlice';
import { clearMap } from '../../../redux/mapSlice';
import { NavBar, ServerSelect } from '../..';
import { Header, ServerSelectButton, Main } from './style';
import { SERVER_LIST } from '../../../constants';

export const Page = (props) => {
  const { serverId, setServerId, children, ...rest } = props;

  const dispatch = useDispatch();

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(!serverId);
  const { isLogin, requestLogout, removeToken, goToAllowedPage } = useLogin();
  const { setServerIdInCookie } = useCookie();

  const handleServerSubmit = (e) => {
    e.preventDefault();

    const selectedId = e.target.serverSelect.value;

    if (!selectedId) return;
    if (selectedId === serverId) {
      setIsServerSelectOpen(false);
      return;
    }
    setServerId(selectedId);
    setServerIdInCookie(selectedId);
    setIsServerSelectOpen(false);

    if (isLogin) {
      requestLogout();
    }
    removeToken();
    goToAllowedPage();
    dispatch(clearLine());
    dispatch(clearStation());
    dispatch(clearMap());
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
