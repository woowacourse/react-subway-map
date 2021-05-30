import React, { useEffect } from 'react';
import Styled from './ServerSelector.styles';
import { ButtonType } from 'types';
import TextButton from 'components/shared/TextButton/TextButton';
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
        <TextButton
          text="🐾 코기"
          styleType={ButtonType.GREEN}
          isSelected={SERVER.CORGI === BASE_URL}
          onClick={() => changeServer(SERVER.CORGI)}
        />
        <TextButton
          text="🧚‍♂️ 완태"
          styleType={ButtonType.GREEN}
          isSelected={SERVER.WANTAE === BASE_URL}
          onClick={() => changeServer(SERVER.WANTAE)}
        />
        <TextButton
          text="⚽️ 아론"
          styleType={ButtonType.GREEN}
          isSelected={SERVER.ARON === BASE_URL}
          onClick={() => changeServer(SERVER.ARON)}
        />
        <TextButton
          text="🌱 시드"
          styleType={ButtonType.GREEN}
          isSelected={SERVER.SEED === BASE_URL}
          onClick={() => changeServer(SERVER.SEED)}
        />
        <TextButton
          text="💡 알리"
          styleType={ButtonType.GREEN}
          isSelected={SERVER.ALLI === BASE_URL}
          onClick={() => changeServer(SERVER.ALLI)}
        />
      </Styled.ButtonsContainer>
      <Notification />
    </Styled.Container>
  );
};

export default ServerSelector;
