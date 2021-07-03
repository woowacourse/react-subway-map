import { useContext } from "react";

import { ModalContext } from "../components/Modal/ModalProvider";

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw Error("ModalContext가 존재하지 않습니다");

  return context;
};

export default useModal;
