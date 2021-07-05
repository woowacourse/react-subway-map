import React from 'react';
import Input, { InputProps } from '../Input/Input';
import { NotificationInputContainer, NotificationText } from './NotificationInput.styles';

interface Message {
  text: string;
  isError: boolean;
}

interface Props extends InputProps {
  message?: Message;
  className?: string;
}

const NotificationInput = ({ message, className, ...options }: Props): JSX.Element => {
  return (
    <NotificationInputContainer
      className={className}
      direction="column"
      justifyContent="space-between"
    >
      <Input {...options} />
      {message?.text && (
        <NotificationText isError={message.isError}>{message.text}</NotificationText>
      )}
    </NotificationInputContainer>
  );
};

export default NotificationInput;
