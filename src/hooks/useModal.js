import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
