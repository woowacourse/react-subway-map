import React, { useState } from 'react';
import NotificationComponent from 'components/shared/Notification/Notification';

const useNotify = () => {
  const [message, setMessage] = useState<string>('');
  const [isValid, setValid] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);

  const showNotiMessage = ({
    message = '',
    valid = false,
    visible,
  }: {
    message?: string;
    valid?: boolean;
    visible: boolean;
  }) => {
    setMessage(message);
    setValid(valid);
    setVisible(visible);
  };

  const NotiMessage = () => (
    <NotificationComponent message={message} isValid={isValid} isVisible={isVisible} />
  );

  return { NotiMessage, showNotiMessage };
};

export default useNotify;
