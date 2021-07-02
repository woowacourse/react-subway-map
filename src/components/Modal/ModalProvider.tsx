import React, { useState, ReactNode, createContext } from "react";

import Modal from "./Modal";

export interface Props {
  children: ReactNode;
}

interface ModalContextProps {
  open: (children: React.ReactNode) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

const ModalProvider = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);

  const open = (modalChildren: ReactNode) => {
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
