import { useState } from 'react';

interface UseModal {
  isModalOpen: boolean;
  modalData: unknown;
  openModal: () => void;
  closeModal: () => void;
  passDataToModal: (data: unknown) => void;
}

const useModal = (initModalData?: unknown): UseModal => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(initModalData);

  const passDataToModal = (modalData: unknown) => {
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
