import PropTypes from 'prop-types';
import React, { VFC } from 'react';
import Input, { InputProps } from '../Input/Input';
import { NotificationInputContainer, NotificationText } from './NotificationInput.styles';

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
    <NotificationInputContainer
      className={className}
      direction="column"
      justifyContent="space-between"
    >
      <Input {...options} />
      {messageInfo?.text && (
        <NotificationText isError={messageInfo.isError}>{messageInfo.text}</NotificationText>
      )}
    </NotificationInputContainer>
  );
};

export default NotificationInput;
