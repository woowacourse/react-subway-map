import React, { FormEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import * as Styled from './BaseLayout.styles';
import { Button, Header, Modal, Navbar, Select } from '..';
import { ReactComponent as ChangeIcon } from '../../assets/icons/exchange-alt-solid.svg';
import useModal from '../../hooks/useModal';
import useSelect from '../../hooks/useSelect';
import useAuth from '../../hooks/useAuth';
import BACKEND from '../../constants/backend';
import { CREWS } from '../../types';

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const history = useHistory();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { server, onSetServer, onLogout } = useAuth();
  const { value: selectedServer, onChange: onChangeSelectedServer } = useSelect(
    server || CREWS.DANYEE
  );

  const handleSubmitServer: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSetServer(selectedServer);
    onLogout();
    closeModal();

    history.replace(history.location.pathname);
  };

  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <Styled.PageContainer>{children}</Styled.PageContainer>
      <Styled.FABWrapper>
        <Button shape="round" onClick={openModal}>
          <ChangeIcon /> 서버 변경
        </Button>
      </Styled.FABWrapper>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Styled.Form onSubmit={handleSubmitServer}>
          <Modal.Title>서버 변경</Modal.Title>
          <Select labelText="서버 선택" value={selectedServer} onChange={onChangeSelectedServer}>
            {Object.entries(BACKEND).map(([crew, { name }]) => (
              <option key={crew} value={crew}>
                {name}
              </option>
            ))}
          </Select>
          <p>서버 변경 시, 로그인 된 상태라면 로그아웃됩니다</p>
          <Modal.Control>
            <Button variant="text">취소</Button>
            <Button>서버 변경</Button>
          </Modal.Control>
        </Styled.Form>
      </Modal>
    </>
  );
};

export default BaseLayout;
