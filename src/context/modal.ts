import { createContext } from "react";

interface Modal {
  open: (children: React.ReactNode) => void;
  close: () => void;
}

const ModalContext = createContext<Modal | null>(null);

export default ModalContext;
