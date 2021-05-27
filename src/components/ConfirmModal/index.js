import React from 'react';
import PropTypes from 'prop-types';
import { ModalTemplate } from '..';
import { COLOR } from '../../constants';
import Button from '../@commons/Button';
import { ButtonWrapper, Container } from './style';

const ConfirmModal = ({ messages, closeModal, onConfirm }) => (
  <ModalTemplate>
    <Container>
      {messages.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
      <ButtonWrapper>
        <Button onClick={closeModal} hasShadow>
          취소
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            closeModal();
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
  messages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  closeModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmModal;
