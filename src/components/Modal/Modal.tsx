import React from 'react';
import * as Styled from './Modal.styles';

interface IProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: IProps) => {
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Styled.Modal onClick={handleClose}>
      <Styled.Inner>{children}</Styled.Inner>
    </Styled.Modal>
  );
};

export default Modal;
