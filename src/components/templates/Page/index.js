import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginByToken } from '../../../redux/userSlice';

import Cookies from 'js-cookie';

import { NavBar, ServerSelect } from '../..';
import { Header, ServerSelectButton, Main } from './style';

import { ROUTE, SERVER_LIST, SERVER_ID, ACCESS_TOKEN } from '../../../constants';

export const Page = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const serverId = Cookies.get(SERVER_ID);
  const accessToken = Cookies.get(ACCESS_TOKEN);

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(!serverId);

  useEffect(() => {
    if (!serverId) {
      return;
    }

    if (!accessToken) {
      history.push(ROUTE.LOGIN);
      return;
    }

    dispatch(loginByToken({ accessToken }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = () => setIsServerSelectOpen(true);
  const handleCloseModal = () => setIsServerSelectOpen(false);

  const setNewServer = (serverId) => Cookies.set(SERVER_ID, serverId);

  const handleServerSubmit = (e) => {
    e.preventDefault();

    const selectedId = e.target.serverSelect.value;

    if (!selectedId) return;
    if (selectedId === serverId) {
      handleCloseModal();
      return;
    }

    setNewServer(selectedId);
    handleCloseModal();
    history.push(ROUTE.LOGOUT);
  };

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
