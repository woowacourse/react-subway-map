import React, { useState } from 'react';
import NotificationComponent from 'components/shared/Notification/Notification';

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

  const Notification = () => (
    <NotificationComponent
      message={notification.message}
      isValid={notification.isValid}
      isVisible={notification.isVisible}
    />
  );

  return { notification, setNotification, Notification };
};

export default useNotify;
