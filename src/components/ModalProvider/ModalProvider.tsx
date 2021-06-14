import React, { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

import { ModalBlock, Dimmed, Contents } from "./ModalProvider.styles";

import { ModalContext } from "../../context";

interface ModalProps {
  close: React.MouseEventHandler<HTMLDivElement>;
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

const Modal = ({ close, children }: ModalProps) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return ModalPortal(
    <ModalBlock onClick={close}>
      <Dimmed opacity={opacity} />
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
      {isOpen && <Modal close={close} children={modalChildren} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
export type { Props };
