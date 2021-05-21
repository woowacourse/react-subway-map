import { MouseEventHandler, useState, useEffect, ReactNode } from "react";

import { Container, Dimmed } from "./Modal.styles";

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
      <Container>{children}</Container>
    </>
  );
};

export default Modal;
