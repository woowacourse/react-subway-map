import React from 'react';
import Styled from './Modal.styles';

interface ModalProps {
  children: React.ReactNode;
  onClickClose: () => void;
}

const Modal = ({ children, onClickClose }: ModalProps) => {
  return (
    <Styled.Dimmer onClick={onClickClose}>
      <Styled.Container>
        <Styled.CloseButton onClick={onClickClose}>
          <svg viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </Styled.CloseButton>
        {children}
      </Styled.Container>
    </Styled.Dimmer>
  );
};

export default Modal;
