import { Dimmer, Container, CloseButton } from './Modal.styles';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';

import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: ModalPortalProps) => {
  const $modal = document.querySelector('#modal');
  return $modal ? createPortal(children, $modal) : null;
};
export interface ModalProps {
  children: React.ReactNode;
  onClickClose: React.MouseEventHandler<HTMLDivElement>;
}
const Modal = ({ children, onClickClose }: ModalProps) => (
  <Portal>
    <Dimmer onClick={(event: React.MouseEvent<HTMLDivElement>) => onClickClose(event)}>
      <Container>
        <CloseButton onClick={(event: React.MouseEvent<HTMLDivElement>) => onClickClose(event)}>
          <CloseIcon />
        </CloseButton>
        {children}
      </Container>
    </Dimmer>
  </Portal>
);

export default Modal;
