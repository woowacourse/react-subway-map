import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.createElement("div");
modalRoot.id = "modal-root";
document.body.appendChild(modalRoot);

const ModalPortal = ({ children, id }) => {
  let $modal = document.getElementById(id);

  if (!$modal) {
    $modal = document.createElement("div");
    $modal.id = id;
  }

  useEffect(() => {
    modalRoot.appendChild($modal);

    return () => modalRoot.removeChild($modal);
  }, [$modal]);

  return ReactDOM.createPortal(children, $modal);
};

ModalPortal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

ModalPortal.defaultProps = {
  id: "modal",
};

export default ModalPortal;
