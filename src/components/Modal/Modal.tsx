import React, { useEffect, useState, ReactNode } from "react";

import ModalPortal from "./ModalPortal";

import useModal from "../../hooks/useModal";

import { ModalBlock, Dimmed, Contents } from "./Modal.styles";

export interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  const [opacity, setOpacity] = useState(0);
  const { close } = useModal();

  useEffect(() => {
    setOpacity(1);
  }, []);

  const dimmedClick: React.MouseEventHandler = ({ target, currentTarget }) => {
    if (target !== currentTarget) return;

    close();
  };

  return ModalPortal(
    <ModalBlock>
      <Dimmed opacity={opacity} onClick={dimmedClick} />
      <Contents>{children}</Contents>
    </ModalBlock>
  );
};

export default Modal;
