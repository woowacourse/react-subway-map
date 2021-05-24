import { MouseEventHandler, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

import { ModalBlock, Dimmed } from "./Modal.styles";

export interface Props {
  closeModal: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const ModalPortal = (child: React.ReactNode) => {
  const $modal = document.getElementById("modal");
  if (!$modal) throw Error("cannot find modal");

  return createPortal(child, $modal);
};

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

export default ModalPortal(Modal);
