import React from 'react';
import PropTypes from 'prop-types';
import { ModalTemplate } from '..';
import { COLOR } from '../../constants';
import Button from '../@commons/Button';
import { ButtonWrapper, Container } from './style';

const ConfirmModal = ({ onCloseModal, onConfirm, children }) => (
  <ModalTemplate>
    <Container>
      {children}
      <ButtonWrapper>
        <Button onClick={onCloseModal} hasShadow>
          취소
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
          backgroundColor={COLOR.AMBER}
          hasShadow
        >
          확인
        </Button>
      </ButtonWrapper>
    </Container>
  </ModalTemplate>
);

ConfirmModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;
