import React from 'react';
import styled from 'styled-components';
import * as Styled from './Modal.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
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

Modal.Title = styled.h2`
  margin-top: 0;
  text-align: center;
`;

Modal.Control = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

export default Modal;
