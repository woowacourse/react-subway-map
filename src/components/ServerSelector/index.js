import React from 'react';
import { useState } from 'react';
import { Button } from '..';
import { COLOR, LS_KEY, SERVERS } from '../../constants';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { Container, ButtonWrapper } from './style';

const ServerSelector = () => {
  const [selectedServer, setServer] = useState(getLocalStorage(LS_KEY.SERVER));

  const handleClickServer = (serverName) => {
    setLocalStorage(LS_KEY.SERVER, serverName);
    setServer(serverName);
  };

  return (
    <Container>
      {Object.keys(SERVERS).map((serverName, index) => (
        <ButtonWrapper key={index}>
          <Button
            type="button"
            backgroundColor={
              selectedServer === serverName ? COLOR.GRAY_300 : COLOR.GRAY_100
            }
            hasShadow
            onClick={() => handleClickServer(serverName)}
          >
            {serverName}
          </Button>
        </ButtonWrapper>
      ))}
    </Container>
  );
};

export default ServerSelector;
