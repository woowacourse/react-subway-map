import React, { MouseEventHandler, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

import { ModalBlock, Dimmed, Contents } from "./Modal.styles";

export interface Props {
  onClose: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const ModalPortal = (child: React.ReactNode) => {
  const $modal = document.getElementById("modal");
  if (!$modal) throw Error("cannot find modal");

  return createPortal(child, $modal);
};

const Modal = ({ onClose: dimmedClick, children }: Props) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return ModalPortal(
    <ModalBlock>
      <Dimmed onClick={dimmedClick} opacity={opacity} />
      <Contents>{children}</Contents>
    </ModalBlock>
  );
};

export default Modal;
