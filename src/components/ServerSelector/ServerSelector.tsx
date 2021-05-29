import React from 'react';
import Styled from './ServerSelector.styles';
import { ButtonType } from 'types';
import TextButton from 'components/shared/TextButton/TextButton';
import { SERVER, NOTIFICATION } from '../../constants';
import { useAppSelector } from 'modules/hooks';

interface Props {
  isMessageVisible: boolean;
  changeServer: (server: string) => void;
}

const ServerSelector = ({ isMessageVisible, changeServer }: Props) => {
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);

  return (
    <Styled.Container>
      <Styled.SelectServerMessage isVisible={isMessageVisible}>
        {NOTIFICATION.SELECT_SERVER}
      </Styled.SelectServerMessage>
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
    </Styled.Container>
  );
};

export default ServerSelector;
