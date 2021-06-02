import React, { useEffect } from 'react';
import Styled from './ServerSelector.styles';
import { ButtonType } from 'types';
import Button from 'components/shared/Button/Button';
import { SERVER, NOTIFICATION } from '../../constants';
import { useAppSelector } from 'modules/hooks';
import useNotify from 'hooks/useNotify';

interface Props {
  isMessageVisible: boolean;
  changeServer: (server: string) => void;
}

const ServerSelector = ({ isMessageVisible, changeServer }: Props) => {
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);

  const { setNotification, Notification } = useNotify();

  useEffect(() => {
    setNotification({
      message: NOTIFICATION.SELECT_SERVER,
      isValid: false,
      isVisible: isMessageVisible,
    });
  }, [isMessageVisible]);

  return (
    <Styled.Container>
      <Styled.Title>서버</Styled.Title>
      <Styled.ButtonsContainer>
        <Button
          styleType={ButtonType.GREEN}
          isSelected={SERVER.CORGI === BASE_URL}
          onClick={() => changeServer(SERVER.CORGI)}
        >
          🐾 코기
        </Button>
        <Button
          styleType={ButtonType.GREEN}
          isSelected={SERVER.WANTAE === BASE_URL}
          onClick={() => changeServer(SERVER.WANTAE)}
        >
          🧚‍♂️ 완태
        </Button>
        <Button
          styleType={ButtonType.GREEN}
          isSelected={SERVER.ARON === BASE_URL}
          onClick={() => changeServer(SERVER.ARON)}
        >
          ⚽️ 아론
        </Button>
        <Button
          styleType={ButtonType.GREEN}
          isSelected={SERVER.SEED === BASE_URL}
          onClick={() => changeServer(SERVER.SEED)}
        >
          🌱 시드
        </Button>
        <Button
          styleType={ButtonType.GREEN}
          isSelected={SERVER.ALLI === BASE_URL}
          onClick={() => changeServer(SERVER.ALLI)}
        >
          💡 알리
        </Button>
      </Styled.ButtonsContainer>
      <Notification />
    </Styled.Container>
  );
};

export default ServerSelector;
