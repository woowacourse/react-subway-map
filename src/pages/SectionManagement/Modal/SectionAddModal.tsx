import React, { MouseEventHandler } from "react";
import { Line, SectionAddRequestItem, Station } from "../../../@types/types";
import { Flex } from "../../../components/@shared/FlexContainer/FlexContainer";

import Block from "../../../components/Block/Block";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import Select from "../../../components/Select/Select";
import useInput from "../../../hooks/@common/useInput";
import useSelect from "../../../hooks/@common/useSelect";
import { validateSectionDistance } from "../../../validations/section";

interface Props {
  onClose: MouseEventHandler<HTMLDivElement>;
  line: Line;
  stations: Station[];
  addSection: (sectionAddRequestItem: SectionAddRequestItem) => Promise<void>;
  deleteSection: ({ lineId, stationId }: { lineId: number; stationId: number }) => Promise<void>;
}

const SectionAddModal = ({ onClose, line, stations, addSection, deleteSection }: Props) => {
  const [firstStation, secondStation] = stations;

  const stationOptions = stations.map(({ id, name }) => ({ value: id, text: name }));
  const { selectValue: upStationId, setValueOnChange: setUpStationIdOnChange } = useSelect(String(firstStation.id));
  const { selectValue: downStationId, setValueOnChange: setDownStationIdOnChange } = useSelect(
    String(secondStation.id)
  );
  const {
    inputValue: distance,
    errorMessage: distanceErrorMessage,
    setValueOnChange: setDistanceOnChange,
    validateOnBlur: validateDistanceOnBlur,
  } = useInput(validateSectionDistance);

  const onAddModal: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await addSection({
      lineId: line.id,
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    });
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={onAddModal}>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🔁 구간 추가</h3>
          <Input value={line.name} placeholder="노선 이름" style={{ marginBottom: "0.9375rem" }} disabled />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select
              value={upStationId}
              onChange={setUpStationIdOnChange}
              defaultOption="이전역"
              options={stationOptions}
              required
              style={{ marginRight: "0.625rem" }}
            />
            <Select
              value={downStationId}
              onChange={setDownStationIdOnChange}
              defaultOption="다음역"
              options={stationOptions}
              required
            />
          </Flex>
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Input
              value={distance}
              onChange={setDistanceOnChange}
              onBlur={validateDistanceOnBlur}
              errorMessage={distanceErrorMessage}
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              placeholder="상행 하행역 거리(km)"
              required
            />
          </Flex>
          <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button>구간 추가</Button>
          </Flex>
        </Block>
      </form>
    </Modal>
  );
};

export default SectionAddModal;
