import PropTypes from 'prop-types';
import React, { FC, MouseEvent } from 'react';
import Close from '../Icon/Close';
import { CloseButton, ModalContainer, ModalInner } from './Modal.styles';

export interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, onClose }) => {
  const onClickDimmed = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (!onClose || target !== currentTarget) return;

    onClose();
  };

  return (
    <ModalContainer onClick={onClickDimmed}>
      <ModalInner>
        <CloseButton buttonType="round" isColored={false}>
          <Close width="90%" />
        </CloseButton>
        {children}
      </ModalInner>
    </ModalContainer>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
