import ReactDOM from "react-dom";
import { useEffect } from "react";

const modalRoot = document.createElement("div");
modalRoot.id = "modal-root";
document.body.appendChild(modalRoot);

const ModalPortal = ({ children }) => {
  const $modal = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild($modal);

    return () => modalRoot.removeChild($modal);
  });

  return ReactDOM.createPortal(children, $modal);
};

export default ModalPortal;
