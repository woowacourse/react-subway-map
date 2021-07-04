import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE, SERVER_ID } from '../constants';

const useServer = () => {
  const history = useHistory();

  const serverId = Cookies.get(SERVER_ID);

  const [isServerSelectOpen, setIsServerSelectOpen] = useState(!serverId);

  useEffect(() => {
    if (!serverId) {
      return;
    }
  }, [serverId]);

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

  return { handleOpenModal, handleServerSubmit, isServerSelectOpen, serverId };
};

export default useServer;
