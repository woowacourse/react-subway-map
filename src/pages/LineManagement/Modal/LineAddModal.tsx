import { useState } from "react";

import Form from "../../../components/Form/Form";
import Block from "../../../components/Block/Block";
import InputField from "../../../components/Input/InputField";
import SelectField from "../../../components/Select/SelectField";
import { Flex } from "../../../components/Layout/FlexContainer/FlexContainer";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import Button from "../../../components/Button/Button";

import useModal from "../../../hooks/useModal";

import { validateSectionDistance } from "../../../utils/validations/section";
import { validateLineName } from "../../../utils/validations/line";
import { CIRCLE_COLOR } from "../../../utils/constants/color";
import { LineAddRequestItem } from "../../../types/line";
import { Station } from "../../../types/station";

interface Props {
  stations: Station[];
  onAddLine: (lineRequestItem: LineAddRequestItem) => void;
}

const LineAddModal = ({ stations, onAddLine }: Props) => {
  const { close } = useModal();

  const DEFAULT_COLOR = "bg-cyan-500";
  const [color, setColor] = useState<keyof typeof CIRCLE_COLOR>(DEFAULT_COLOR);

  const stationOptions = stations.map(({ id, name }) => ({
    value: id,
    text: name,
  }));

  return (
    <Form
      submit={async ({ distance, upStationId, downStationId, name }) => {
        await onAddLine({
          color,
          distance: Number(distance),
          upStationId: Number(upStationId),
          downStationId: Number(downStationId),
          name,
        });

        close();
      }}
      validators={{
        name: validateLineName,
        distance: validateSectionDistance,
      }}
    >
      <Block
        css={{
          flexDirection: "column",
          maxWidth: "40.625rem",
          alignItems: "flex-start",
        }}
      >
        <h3 css={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>
          🛤️ 노선 추가
        </h3>
        <InputField
          name="name"
          placeholder="노선 이름"
          css={{ marginBottom: "0.9375rem" }}
          required
        />
        <Flex css={{ width: "100%", marginBottom: "0.9375rem" }}>
          <SelectField
            name="upStationId"
            defaultOption="상행역"
            options={stationOptions}
            css={{ marginRight: "0.625rem" }}
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
          css={{
            width: "100%",
            marginBottom: "0.9375rem",
            flexDirection: "column",
          }}
        >
          <InputField
            name="distance"
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
          css={{ marginBottom: "0.9375rem" }}
        />
        <Flex css={{ width: "100%", justifyContent: "flex-end" }}>
          <Button>노선 추가</Button>
        </Flex>
      </Block>
    </Form>
  );
};

export default LineAddModal;
