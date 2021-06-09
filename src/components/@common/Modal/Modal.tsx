import { FC, MouseEvent } from 'react';
import { ModalSize } from '../../../types';
import { ModalInnerContainer, ModalOuterContainer } from './Modal.styles';

export interface ModalProps {
  children: React.ReactNode;
  closeModal?: () => void;
  size?: ModalSize;
}

const Modal: FC<ModalProps> = ({ children, closeModal, size = 'medium' }) => {
  const handleClose = ({
    target,
    currentTarget,
  }: MouseEvent<HTMLDivElement>) => {
    if (target !== currentTarget) return;

    if (closeModal) closeModal();
  };

  return (
    <ModalOuterContainer onMouseDown={handleClose}>
      <ModalInnerContainer size={size}>{children}</ModalInnerContainer>
    </ModalOuterContainer>
  );
};

export default Modal;
