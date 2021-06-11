import React, { VFC } from 'react';
import Input, { InputProps } from '../Input/Input';
import { NotificationFormInputContainer, NotificationText } from './NotificationInput.styles';

interface Message {
  text: string;
  isError: boolean;
}

interface Props extends InputProps {
  messageInfo?: Message;
  className?: string;
}

const NotificationInput: VFC<Props> = ({ messageInfo, className, ...options }) => {
  return (
    <NotificationFormInputContainer
      className={className}
      direction="column"
      justifyContent="space-between"
    >
      <Input {...options} />
      {messageInfo?.text && (
        <NotificationText isError={messageInfo.isError}>{messageInfo.text}</NotificationText>
      )}
    </NotificationFormInputContainer>
  );
};

export default NotificationInput;
