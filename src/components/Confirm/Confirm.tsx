import { MouseEventHandler } from "react";
import Modal from "../Modal/Modal";

import { Inner, Title, ButtonControls } from "./Confirm.styles";

export interface Props {
  title: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onReject: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const Confirm = ({ title, onConfirm, onReject }: Props) => (
  <Modal onClose={onReject}>
    <Inner>
      <Title>
        <p>{title}</p>
      </Title>
      <ButtonControls>
        <button type="button" onClick={onReject}>
          <p>취소</p>
        </button>
        <button type="button" onClick={onConfirm} data-testid="confirm-button">
          <p>확인</p>
        </button>
      </ButtonControls>
    </Inner>
  </Modal>
);

export default Confirm;
