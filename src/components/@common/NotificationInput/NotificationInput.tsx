import PropTypes from 'prop-types';
import React, { FC } from 'react';
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

const NotificationInput: FC<Props> = ({ message, className, ...options }) => {
  return (
    <NotificationInputContainer
      className={className}
      direction="column"
      justifyContent="space-between"
    >
      <Input {...options} />
      {message && <NotificationText isError={message.isError}>{message.text}</NotificationText>}
    </NotificationInputContainer>
  );
};

NotificationInput.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }),
  className: PropTypes.string,
};

export default NotificationInput;
