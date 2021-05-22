import * as S from './Modal.styles';

export interface Props {
  onCloseModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ onCloseModal, children }: Props) => {
  const onClickModalDimmed = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;

    onCloseModal();
  };
  return (
    <S.ModalWrapper onClick={onClickModalDimmed}>
      <S.ModalInner>{children}</S.ModalInner>
    </S.ModalWrapper>
  );
};

export default Modal;
