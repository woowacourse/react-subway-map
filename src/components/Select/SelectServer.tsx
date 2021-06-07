import React, { ChangeEventHandler, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Select from './Select';
import * as Styled from './SelectServer.styles';
import useSelect from '../../hooks/useSelect';
import ROUTES from '../../constants/routes';
import BACKEND from '../../constants/backend';
import { CREWS } from '../../types';
import useSelectServer from '../../hooks/useSelectServer';
import MESSAGE from '../../constants/message';
import useConfirm from '../../hooks/useConfirm';
import Confirm from '../Confirm/Confirm';

const isCrews = (server: string): server is CREWS => server in CREWS;

const SelectServer = () => {
  const location = useLocation();

  const { isConfirmOpen, setIsConfirmOpen, confirm, cancel } = useConfirm();

  const { enqueueSnackbar } = useSnackbar();

  const { server, isLogin, onLogout, requestChangeServer } = useSelectServer();
  const { value: selectedServer, setValue: setSelectedServer } = useSelect(server || CREWS.DANYEE);

  const handleChangeServer: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const currentServer = event.target.value;

    if (!isCrews(currentServer)) return;

    if (isLogin) {
      setIsConfirmOpen(true);

      return;
    }

    setSelectedServer(currentServer);
    requestChangeServer(currentServer);
  };

  const handleLogout = () => {
    confirm(onLogout);
    enqueueSnackbar(MESSAGE.SUCCESS.LOGOUT);
  };

  useEffect(() => {
    setSelectedServer(server);
  }, [isLogin, server, setSelectedServer]);

  if (location.pathname === ROUTES.ROOT || location.pathname === ROUTES.SIGNUP) {
    return null;
  }

  return (
    <>
      <Styled.Container>
        <Select
          labelText="서버선택"
          placeholder="서버선택"
          arrowDirection="up"
          value={selectedServer}
          onChange={handleChangeServer}
        >
          {Object.entries(BACKEND).map(([crew, { name }]) => (
            <option key={crew} value={crew}>
              {name}
            </option>
          ))}
        </Select>
      </Styled.Container>

      {isConfirmOpen && (
        <Confirm onConfirm={handleLogout} onCancel={cancel} onClose={cancel}>
          {MESSAGE.ALERT.CHANGE_SERVER}
        </Confirm>
      )}
    </>
  );
};

export default SelectServer;
