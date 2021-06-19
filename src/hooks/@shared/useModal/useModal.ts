import { useContext } from 'react';
import { ModalContext } from '../../../components/@common/ModalProvider/ModalProvider';

const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('ModalProvider 컴포넌트 내부에서만 useModal hook을 사용할 수 있습니다.');
  }

  return modalContext;
};

export default useModal;
