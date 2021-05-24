import { MouseEventHandler } from "react";
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
}

const LineAddModal = ({ onClose }: Props) => {
  const stationOptions = stations.map(({ id, name }) => ({ value: id, text: name }));

  return (
    <Modal onClose={onClose}>
      <form>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🛤️ 노선 추가</h3>
          <Input placeholder="노선 이름" style={{ marginBottom: "0.9375rem" }} />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select options={stationOptions} style={{ marginRight: "0.625rem" }} />
            <Select options={stationOptions} />
          </Flex>
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Input placeholder="상행 하행역 거리(km)" style={{ marginRight: "0.625rem" }} />
            <Input placeholder="상행 하행역 시간(분)" />
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
