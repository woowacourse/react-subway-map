import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, ConfirmModal } from '..';
import { COLOR, LS_KEY, ROUTE, SERVERS } from '../../constants';
import { useModal } from '../../hooks';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { Container, ButtonWrapper } from './style';

const ServerSelector = () => {
  const [server, setServer] = useState({
    current: getLocalStorage(LS_KEY.SERVER),
    next: null,
  });
  const { isModalOpen, openModal, closeModal } = useModal();
  const history = useHistory();
  const { token } = useSelector(({ user }) => user);

  const changeServer = () => {
    setServer((server) => {
      setLocalStorage(LS_KEY.SERVER, server.next);

      return {
        ...server,
        current: server.next,
      };
    });
  };

  const handleClickServer = (serverName) => {
    if (server.current === serverName) return;

    setServer({ ...server, next: serverName });

    if (!token) {
      changeServer();

      return;
    }

    openModal();
  };

  return (
    <>
      <Container>
        {Object.keys(SERVERS).map((serverName, index) => (
          <ButtonWrapper key={index}>
            <Button
              type="button"
              backgroundColor={
                server.current === serverName ? COLOR.GRAY_300 : COLOR.GRAY_100
              }
              hasShadow
              onClick={() => handleClickServer(serverName)}
            >
              {serverName}
            </Button>
          </ButtonWrapper>
        ))}
      </Container>
      {isModalOpen && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={() => {
            changeServer();
            history.push(ROUTE.SIGN_OUT.PATH);
          }}
        >
          <span>서버를 변경하면 자동으로 로그아웃이 됩니다.</span>
          <span>계속 진행 하시겠습니까?</span>
        </ConfirmModal>
      )}
    </>
  );
};

export default ServerSelector;
