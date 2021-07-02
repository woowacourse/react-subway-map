import {
  Block,
  Button,
  Form,
  FormProvider,
  Input,
  InputField,
  SelectField,
} from "../../../components";
import { Flex } from "../../../components";

import { useModal } from "../../../hooks";

import { validateSectionDistance } from "../../../validations";
import { Line, SectionAddRequestItem } from "../../../types/line";
import { Station } from "../../../types/station";

interface Props {
  line: Line;
  stations: Station[];
  addSection: (sectionAddRequestItem: SectionAddRequestItem) => Promise<void>;
  deleteSection: ({
    lineId,
    stationId,
  }: {
    lineId: number;
    stationId: number;
  }) => Promise<void>;
}

const SectionAddModal = ({
  line,
  stations,
  addSection,
  deleteSection,
}: Props) => {
  const stationOptions = stations.map(({ id, name }) => ({
    value: id,
    text: name,
  }));

  const { close } = useModal();

  return (
    <FormProvider
      submit={async ({ distance, upStationId, downStationId }) => {
        await addSection({
          lineId: line.id,
          upStationId: Number(upStationId),
          downStationId: Number(downStationId),
          distance: Number(distance),
        });

        close();
      }}
      validators={{ distance: validateSectionDistance }}
    >
      <Form>
        <Block css={{ flexDirection: "column", maxWidth: "40.625rem" }}>
          <h3 css={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>
            🔁 구간 추가
          </h3>
          <Input
            value={line.name}
            placeholder="노선 이름"
            css={{ marginBottom: "0.9375rem" }}
            disabled
          />
          <Flex css={{ width: "100%", marginBottom: "0.9375rem" }}>
            <SelectField
              name="upStationId"
              defaultOption="상행역"
              options={stationOptions}
              required
              css={{ marginRight: "0.625rem" }}
            />
            <SelectField
              name="downStationId"
              defaultOption="하행역"
              options={stationOptions}
              required
            />
          </Flex>
          <Flex css={{ width: "100%", marginBottom: "0.9375rem" }}>
            <InputField
              name="distance"
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              placeholder="상행 하행역 거리(km)"
              required
            />
          </Flex>
          <Flex css={{ width: "100%", justifyContent: "flex-end" }}>
            <Button>구간 추가</Button>
          </Flex>
        </Block>
      </Form>
    </FormProvider>
  );
};

export default SectionAddModal;
