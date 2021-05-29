import { useState } from 'react';

const useNotify = () => {
  const [notification, setNotification] = useState<{
    message: string;
    isValid: boolean;
    isVisible: boolean;
  }>({
    message: '',
    isValid: false,
    isVisible: false,
  });

  return { notification, setNotification };
};

export default useNotify;
