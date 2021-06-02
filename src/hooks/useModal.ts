import React, { useState } from 'react';

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onModalOpen = () => {
    setModalOpen(true);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };

  return { modalOpen, onModalOpen, onModalClose };
};

export default useModal;
