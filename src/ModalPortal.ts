import React from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const element = document.getElementById('modal');

  return ReactDOM.createPortal(children, element as Element);
};

export default ModalPortal;
