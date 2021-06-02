import React from 'react';
import Styled from './CloseButton.styles';

interface Props {
  closeModal: () => void;
}

const CloseButton = ({ closeModal }: Props) => {
  return (
    <Styled.CloseButton onClick={closeModal}>
      <svg viewBox="0 0 40 40">
        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </Styled.CloseButton>
  );
};

export default CloseButton;
