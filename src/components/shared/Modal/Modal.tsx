import React from 'react';
import Styled from './Modal.styles';

interface Props {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  closeButton?: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, title, children, closeButton, onClose, ...props }: Props) => {
  const onClickDimmer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Styled.Dimmer isOpen={isOpen} onClick={onClickDimmer}>
      <Styled.Container {...props}>
        {closeButton}
        <Styled.Title>{title}</Styled.Title>
        {children}
      </Styled.Container>
    </Styled.Dimmer>
  );
};

export default Modal;
