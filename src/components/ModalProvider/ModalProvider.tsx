import React, { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

import { ModalBlock, Dimmed, Contents } from "./ModalProvider.styles";

import ModalContext from "../../context/modal";
import { useModal } from "../../hooks";

interface ModalProps {
  children: ReactNode;
}

interface Props {
  children: React.ReactNode;
}

const ModalPortal = (child: React.ReactNode) => {
  const $modal = document.getElementById("modal");
  if (!$modal) {
    const $modal = document.createElement("div");
    $modal.setAttribute("id", "modal");
    document.body.appendChild($modal);

    return createPortal(child, $modal);
  }

  return createPortal(child, $modal);
};

const Modal = ({ children }: ModalProps) => {
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

const ModalProvider = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);

  const open = (modalChildren: React.ReactNode) => {
    setModalChildren(modalChildren);
    setOpen(true);
  };

  const close = () => {
    setModalChildren(null);
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}
      {isOpen && <Modal children={modalChildren} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
export type { Props };
