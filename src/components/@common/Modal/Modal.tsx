import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Dimmed from '../Dimmed/Dimmed';
import Close from '../Icon/Close';
import { CloseButton, ModalContent, ModalInner, ModalTitle } from './Modal.styles';

const $modalRoot = document.getElementById('modal-root');

export interface Props {
  children: React.ReactNode;
  titleText?: string;
  onClose: () => void;
}

const Modal = ({ children, titleText, onClose }: Props): JSX.Element => {
  const onClickDimmed: MouseEventHandler<HTMLDivElement> = ({ target, currentTarget }) => {
    if (!onClose || target !== currentTarget) return;

    onClose();
  };

  return ReactDOM.createPortal(
    <Dimmed onMouseDown={onClickDimmed}>
      <ModalInner>
        <CloseButton buttonShape="round" isColored={false} onClick={onClose}>
          <Close width="90%" />
        </CloseButton>
        {titleText && <ModalTitle>{titleText}</ModalTitle>}
        <ModalContent hasTitle={!!titleText}>{children}</ModalContent>
      </ModalInner>
    </Dimmed>,
    $modalRoot as HTMLDivElement
  );
};

export default Modal;
