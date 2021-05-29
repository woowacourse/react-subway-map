import React from 'react';
import * as Styled from './Modal.styles';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IProps) => {
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <Styled.Modal role="dialog" onClick={handleClose}>
      <Styled.Inner>{children}</Styled.Inner>
    </Styled.Modal>
  );
};

export default Modal;
