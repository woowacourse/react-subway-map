import { useState } from 'react';

interface UseModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModal => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
