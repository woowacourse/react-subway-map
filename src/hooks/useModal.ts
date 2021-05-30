import { useCallback, useState } from 'react';

export default () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return { isModalOpen, openModal, closeModal };
};
