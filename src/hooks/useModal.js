import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setModalState] = useState(false);

  const handleClickToClose = (event) => {
    const target = event.target;
    const currentTarget = event.currentTarget;

    if (target !== currentTarget) return;

    closeModal();
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return {
    isModalOpen,
    handleClickToClose,
    openModal,
    closeModal,
  };
};

export default useModal;
