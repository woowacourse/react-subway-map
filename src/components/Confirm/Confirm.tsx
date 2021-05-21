import { MouseEventHandler } from "react";
import Modal from "../Modal/Modal";

import { Inner, Title, ButtonControls } from "./Confirm.styles";

export interface Props {
  title: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onReject: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const Confirm = ({ title, onConfirm, onReject }: Props) => (
  <Modal closeModal={onReject}>
    <Inner>
      <Title>
        <p>{title}</p>
      </Title>
      <ButtonControls>
        <button onClick={onReject}>
          <p>취소</p>
        </button>
        <button onClick={onConfirm}>
          <p>확인</p>
        </button>
      </ButtonControls>
    </Inner>
  </Modal>
);

export default Confirm;
