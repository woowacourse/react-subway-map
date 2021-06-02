import React from 'react';
import Styled from './Notification.styles';

interface Props {
  message: string;
  isValid: boolean;
  isVisible: boolean;
}

const Notification = ({ message, isValid, isVisible }: Props) => {
  return (
    <Styled.Container isValid={isValid} isVisible={isVisible}>
      {message}
    </Styled.Container>
  );
};

export default Notification;
