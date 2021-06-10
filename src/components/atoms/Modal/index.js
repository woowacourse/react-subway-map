import React from 'react';
import { PropTypes } from 'prop-types';
import { ModalContainer, ModalInner } from './style';

export const Modal = (props) => {
  const { children } = props;

  return (
    <ModalContainer role="dialog" aria-modal aria-labelledby="title-dialog">
      <ModalInner>{children}</ModalInner>
    </ModalContainer>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
