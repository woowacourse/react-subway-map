import { useModal } from "../../hooks";

import { Block, Title, ButtonControls } from "./Confirm.styles";

export interface Props {
  title: string;
  onConfirm?: () => void;
  onReject?: () => void;
}

const Confirm = ({ title, onConfirm, onReject }: Props) => {
  const { close } = useModal();

  const confirm = () => {
    onConfirm?.();
    close();
  };

  const reject = () => {
    onReject?.();
    close();
  };

  return (
    <Block>
      <Title>
        <p>{title}</p>
      </Title>
      <ButtonControls>
        <button type="button" onClick={reject}>
          <p>취소</p>
        </button>
        <button type="button" onClick={confirm} data-testid="confirm-button">
          <p>확인</p>
        </button>
      </ButtonControls>
    </Block>
  );
};

export default Confirm;
