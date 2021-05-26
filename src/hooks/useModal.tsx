import React, { useCallback, useState } from 'react';
import { Modal as ModalComponent } from '../components';

interface IProps {
  children: React.ReactNode;
}

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const Modal = useCallback(
    ({ children, ...props }: IProps) => {
      if (!isModalOpen) return null;

      return (
        <ModalComponent onClose={closeModal} {...props}>
          {children}
        </ModalComponent>
      );
    },
    [closeModal, isModalOpen]
  );

  return { Modal, isModalOpen, openModal, closeModal };
};
