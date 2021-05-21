import { MouseEventHandler, useState, useEffect, ReactNode } from "react";

import { ModalBlock, Dimmed } from "./Modal.styles";

export interface Props {
  closeModal: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const Modal = ({ closeModal: dimmedClick, children }: Props) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <>
      <Dimmed onClick={dimmedClick} opacity={opacity} />
      <ModalBlock>{children}</ModalBlock>
    </>
  );
};

export default Modal;
