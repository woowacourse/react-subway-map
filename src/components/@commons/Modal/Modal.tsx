import * as S from './Modal.styles';
import ReactDOM from 'react-dom';

export interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const $modal = document.querySelector('#modal');

const Modal = ({ onClose, children }: Props) => {
  const onClickModalDimmed = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;

    onClose();
  };

  if (!$modal) return null;

  return ReactDOM.createPortal(
    <S.ModalWrapper onClick={onClickModalDimmed}>
      <S.ModalInner>{children}</S.ModalInner>
    </S.ModalWrapper>,
    $modal
  );
};

export default Modal;
