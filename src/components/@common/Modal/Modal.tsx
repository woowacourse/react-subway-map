import { FC } from 'react';
import { ModalSize } from '../../../types';
import { ModalInnerContainer, ModalOuterContainer } from './Modal.styles';

export interface ModalProps {
  children: React.ReactNode;
  size?: ModalSize;
}

const Modal: FC<ModalProps> = ({ children, size = 'medium' }) => {
  return (
    <ModalOuterContainer>
      <ModalInnerContainer size={size}>{children}</ModalInnerContainer>
    </ModalOuterContainer>
  );
};

export default Modal;
