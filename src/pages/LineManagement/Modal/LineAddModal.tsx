import { MouseEventHandler } from "react";
import { LineRequestItem } from "../../../@types/types";
import { Flex } from "../../../components/@shared/FlexContainer/FlexContainer";

import Block from "../../../components/Block/Block";
import Button from "../../../components/Button/Button";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import Select from "../../../components/Select/Select";

import { stations } from "../../../mocks/mocks";

interface Props {
  onClose: MouseEventHandler<HTMLDivElement>;
  onAddLine: (lineRequestItem: LineRequestItem) => void;
}

const LineAddModal = ({ onClose, onAddLine }: Props) => {
  const stationOptions = stations.map(({ id, name }) => ({ value: id, text: name }));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // onAddLine()
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🛤️ 노선 추가</h3>
          <Input placeholder="노선 이름" style={{ marginBottom: "0.9375rem" }} required />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select options={stationOptions} style={{ marginRight: "0.625rem" }} required />
            <Select options={stationOptions} required />
          </Flex>
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Input
              type="number"
              defaultValue="1"
              min="0.1"
              max="1000"
              step="0.1"
              placeholder="상행 하행역 거리(km)"
              required
            />
          </Flex>
          <ColorPicker style={{ marginBottom: "0.9375rem" }} />
          <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button>노선 추가</Button>
          </Flex>
        </Block>
      </form>
    </Modal>
  );
};

export default LineAddModal;
