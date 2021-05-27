import { MouseEventHandler, useState } from "react";
import { LineAddRequestItem, Station } from "../../../@types/types";
import { Flex } from "../../../components/@shared/FlexContainer/FlexContainer";

import Block from "../../../components/Block/Block";
import Button from "../../../components/Button/Button";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import Select from "../../../components/Select/Select";
import useInput from "../../../hooks/@common/useInput";
import useSelect from "../../../hooks/@common/useSelect";
import { validateLineName } from "../../../validations/line";
import { validateSectionDistance } from "../../../validations/section";
import { CIRCLE_COLOR } from "../../../constants/color";

interface Props {
  onClose: MouseEventHandler<HTMLDivElement>;
  stations: Station[];
  onAddLine: (lineRequestItem: LineAddRequestItem) => void;
}

const LineAddModal = ({ onClose, stations, onAddLine }: Props) => {
  const [firstStation, secondStation] = stations;

  const {
    inputValue: lineName,
    errorMessage: lineNameErrorMessage,
    setValueOnChange: setLineNameOnChange,
    validateOnBlur: lineNameValidateOnBlur,
  } = useInput(validateLineName);
  const { selectValue: upStationId, setValueOnChange: setUpStationOnChange } = useSelect(String(firstStation.id));
  const { selectValue: downStationId, setValueOnChange: setDownStationOnChange } = useSelect(String(secondStation.id));
  const {
    inputValue: distance,
    errorMessage: disatanceErrorMessage,
    setValueOnChange: setDistanceOnChange,
    validateOnBlur: validateDistanceOnBlur,
  } = useInput(validateSectionDistance);

  const DEFAULT_COLOR = "bg-cyan-500";
  const [color, setColor] = useState<keyof typeof CIRCLE_COLOR>(DEFAULT_COLOR);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (lineNameErrorMessage || disatanceErrorMessage) {
      alert("노선을 추가할 수 없습니다");
      return;
    }

    onAddLine({
      color,
      distance: Number(distance),
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      name: lineName,
    });
  };

  const stationOptions = stations.map(({ id, name }) => ({ value: id, text: name }));

  return (
    <Modal onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem", alignItems: "flex-start" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🛤️ 노선 추가</h3>
          <Input
            value={lineName}
            errorMessage={lineNameErrorMessage}
            onChange={setLineNameOnChange}
            onBlur={lineNameValidateOnBlur}
            placeholder="노선 이름"
            style={{ marginBottom: "0.9375rem" }}
            required
          />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select
              value={upStationId}
              onChange={setUpStationOnChange}
              options={stationOptions}
              style={{ marginRight: "0.625rem" }}
              required
            />
            <Select value={downStationId} onChange={setDownStationOnChange} options={stationOptions} required />
          </Flex>
          <Flex style={{ width: "100%", marginBottom: "0.9375rem", flexDirection: "column" }}>
            <Input
              type="number"
              value={distance}
              errorMessage={disatanceErrorMessage}
              onChange={setDistanceOnChange}
              onBlur={validateDistanceOnBlur}
              step="0.1"
              min="0.1"
              placeholder="상행 하행역 거리(km)"
              required
            />
          </Flex>
          <ColorPicker color={color} onSetColor={setColor} style={{ marginBottom: "0.9375rem" }} />
          <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button>노선 추가</Button>
          </Flex>
        </Block>
      </form>
    </Modal>
  );
};

export default LineAddModal;
