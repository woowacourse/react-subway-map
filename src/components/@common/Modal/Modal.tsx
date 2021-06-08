import React, { FC, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import Close from '../Icon/Close';
import { CloseButton, ModalContainer, ModalContent, ModalInner, ModalTitle } from './Modal.styles';

let $modalRoot = document.getElementById('modal-root');

if (!$modalRoot) {
  $modalRoot = document.createElement('div');
  $modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild($modalRoot);
}

export interface Props {
  children: React.ReactNode;
  titleText?: string;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, titleText, onClose }) => {
  const onClickDimmed = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (!onClose || target !== currentTarget) return;

    onClose();
  };

  return ReactDOM.createPortal(
    <ModalContainer onMouseDown={onClickDimmed}>
      <ModalInner>
        <CloseButton buttonType="round" isColored={false} onClick={onClose}>
          <Close width="90%" />
        </CloseButton>
        {titleText && <ModalTitle>{titleText}</ModalTitle>}
        <ModalContent hasTitle={!!titleText}>{children}</ModalContent>
      </ModalInner>
    </ModalContainer>,
    $modalRoot as HTMLDivElement
  );
};

export default Modal;
