import { useContext } from "react";

import ModalContext from "../context/modal";

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw Error("ModalContext가 존재하지 않습니다");

  return context;
};

export default useModal;
