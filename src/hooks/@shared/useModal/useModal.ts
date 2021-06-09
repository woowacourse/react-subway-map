import { useState } from 'react';

interface UseModal<T> {
  isModalOpen: boolean;
  modalData?: T;
  openModal: () => void;
  closeModal: () => void;
  passDataToModal: (data: T) => void;
}

const useModal = <T>(initModalData?: T): UseModal<T> => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(initModalData);

  const passDataToModal = (modalData: T) => {
    setModalData(modalData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, modalData, openModal, closeModal, passDataToModal };
};

export default useModal;
