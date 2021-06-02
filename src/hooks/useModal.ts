import { useState } from 'react';

const useModal = (isOpened = false) => {
  const [isModalOpen, setModalState] = useState<boolean>(isOpened);

  const onClickClose: React.MouseEventHandler<HTMLDivElement> = event => {
    if (event.target !== event.currentTarget) return;

    setModalState(false);
  };

  const open = () => setModalState(true);
  const close = () => setModalState(false);
  const toggle = () => setModalState(state => !state);

  return {
    isModalOpen,
    onClickClose,
    open,
    close,
    toggle,
  };
};

export default useModal;
