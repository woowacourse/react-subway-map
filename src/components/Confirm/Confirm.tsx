import React, { MouseEventHandler, ReactNode } from 'react';
import * as Styled from './Confirm.styles';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  children: ReactNode;
}

const Confirm = ({ onConfirm, onCancel, onClose, children }: Props) => {
  const handleDialogClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Styled.Container onClick={handleDialogClose}>
      <Styled.Content>
        <Styled.TextWrapper>{children}</Styled.TextWrapper>
        <section>
          <Styled.CancelButton onClick={onCancel}>취소</Styled.CancelButton>
          <Styled.ConfirmButton onClick={onConfirm}>확인</Styled.ConfirmButton>
        </section>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Confirm;
