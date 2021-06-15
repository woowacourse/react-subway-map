import React, { FC, MouseEvent, ReactNode, useState } from 'react';
import Close from '../Icon/Close';
import { CloseButton, ModalContainer, ModalInner } from './ModalProvider.styles';

/* let $modalRoot = document.getElementById('modal-root');

if (!$modalRoot) {
  $modalRoot = document.createElement('div');
  $modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild($modalRoot);
} */

type OpenModal = (Component: ReactNode) => void;

export interface ModalContextType {
  openModal: OpenModal;
  closeModal: () => void;
}

interface ModalProps {
  children: ReactNode;
}

export const ModalContext = React.createContext<ModalContextType | null>(null);

const ModalProvider: FC<ModalProps> = ({ children }) => {
  const [ContentComponent, setContentComponent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal: OpenModal = (Component) => {
    setContentComponent(Component);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClickDimmed = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (target !== currentTarget) return;

    closeModal();
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <ModalContainer onMouseDown={onClickDimmed}>
          <ModalInner>
            <CloseButton buttonType="round" isColored={false} onClick={closeModal}>
              <Close size="90%" />
            </CloseButton>
            {ContentComponent && isOpen && ContentComponent}
          </ModalInner>
        </ModalContainer>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
