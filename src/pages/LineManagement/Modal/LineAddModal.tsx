import { useState } from "react";

import { Block, Button, ColorPicker, InputField } from "../../../components";
import { Flex } from "../../../components";

import { useForm, useModal } from "../../../hooks";

import {
  validateLineName,
  validateSectionDistance,
} from "../../../validations";
import { CIRCLE_COLOR } from "../../../constants";
import { LineAddRequestItem, Station } from "../../../@types";
import SelectField from "../../../components/SelectField/SelectField";

interface Props {
  stations: Station[];
  onAddLine: (lineRequestItem: LineAddRequestItem) => void;
}

const LineAddModal = ({ stations, onAddLine }: Props) => {
  const {
    values: { name, distance, upStationId, downStationId },
    isValid,
  } = useForm();
  const { close } = useModal();

  const DEFAULT_COLOR = "bg-cyan-500";
  const [color, setColor] = useState<keyof typeof CIRCLE_COLOR>(DEFAULT_COLOR);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isValid) {
      alert("노선을 추가할 수 없습니다");
      return;
    }

    await onAddLine({
      color,
      distance: Number(distance),
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      name,
    });

    close();
  };

  const stationOptions = stations.map(({ id, name }) => ({
    value: id,
    text: name,
  }));

  return (
    <form onSubmit={onSubmit}>
      <Block
        style={{
          flexDirection: "column",
          maxWidth: "40.625rem",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>
          🛤️ 노선 추가
        </h3>
        <InputField
          name="name"
          validator={validateLineName}
          placeholder="노선 이름"
          style={{ marginBottom: "0.9375rem" }}
          required
        />
        <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
          <SelectField
            name="upStationId"
            defaultOption="상행역"
            options={stationOptions}
            style={{ marginRight: "0.625rem" }}
            required
          />
          <SelectField
            name="downStationId"
            defaultOption="하행역"
            options={stationOptions}
            required
          />
        </Flex>
        <Flex
          style={{
            width: "100%",
            marginBottom: "0.9375rem",
            flexDirection: "column",
          }}
        >
          <InputField
            name="distance"
            validator={validateSectionDistance}
            type="number"
            step="0.1"
            min="0.1"
            placeholder="상행 하행역 거리(km)"
            required
          />
        </Flex>
        <ColorPicker
          color={color}
          onSetColor={setColor}
          style={{ marginBottom: "0.9375rem" }}
        />
        <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button>노선 추가</Button>
        </Flex>
      </Block>
    </form>
  );
};

export default LineAddModal;
