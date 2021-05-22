import React from 'react';
import Styled from './Modal.styles';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  const clickDimmer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Styled.Dimmer onClick={clickDimmer}>
      <Styled.Container>
        <Styled.CloseButton onClick={onClose}>
          <svg viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </Styled.CloseButton>
        <Styled.Title>{title}</Styled.Title>
        {children}
      </Styled.Container>
    </Styled.Dimmer>
  );
};

export default Modal;
