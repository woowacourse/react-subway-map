import { useState } from 'react';

const useConfirm = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const confirm = (callback?: () => void) => {
    setIsConfirmOpen(false);

    callback?.();
  };

  const cancel = () => {
    setIsConfirmOpen(false);
  };

  return { isConfirmOpen, setIsConfirmOpen, confirm, cancel };
};

export default useConfirm;
