import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import { useLogin, useCookies } from '../../hooks';
import { clearStation } from '../../redux/stationSlice';
import { clearLine } from '../../redux/lineSlice';
import { clearMap } from '../../redux/mapSlice';
import { NavBar, ServerSelect } from '../../components';
import { Header, ServerSelectButton, Main } from './style';
import { SERVER_LIST } from '../../constants';

export const Template = (props) => {
  const { children, ...rest } = props;

  const dispatch = useDispatch();
  const { isLogin, requestLogout, removeToken, goToAllowedPage } = useLogin();
  const { serverId, setServerId } = useCookies();
  const [isServerSelectOpen, setIsServerSelectOpen] = useState(!serverId);

  const handleServerSubmit = (e) => {
    e.preventDefault();

    const selectedId = e.target.serverSelect.value;

    if (!selectedId) return;
    if (selectedId === serverId) {
      setIsServerSelectOpen(false);
      return;
    }
    if (isLogin) {
      requestLogout();
    }
    setServerId(selectedId);
    setIsServerSelectOpen(false);

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

Template.propTypes = {
  children: PropTypes.node.isRequired,
};
