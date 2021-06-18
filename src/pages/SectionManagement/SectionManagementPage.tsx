import SectionAddModal from "./Modal/SectionAddModal";
import { Button, Block, Select, ListItem } from "../../components";
import { Flex, FlexCenter, FlexBetween } from "../../components";

import { useStation, useLine, useSelect, useModal } from "../../hooks";

import { SIZE } from "../../constants";

const SectionManagementPage = () => {
  const { open } = useModal();

  const { stations } = useStation();
  const { lines, addSection, deleteSection } = useLine();

  const [defaultLine] = lines;
  const {
    selectValue: lineId,
    setValueOnChange: setLineIdOnChange,
  } = useSelect(String(defaultLine?.id));

  const targetLine = lines.find(({ id }) => id === Number(lineId));

  return (
    <FlexCenter>
      <Block
        css={{
          marginTop: "2.5rem",
          width: SIZE.PAGE_CONTAINER_WIDTH,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <FlexBetween css={{ width: "100%", marginBottom: "1rem" }}>
          <h2 css={{ marginBottom: "1rem" }}>🔁 구간 관리</h2>
          <Button
            type="button"
            onClick={() => {
              targetLine &&
                open(
                  <SectionAddModal
                    addSection={addSection}
                    deleteSection={deleteSection}
                    line={targetLine}
                    stations={stations}
                  />
                );
            }}
          >
            구간 추가
          </Button>
        </FlexBetween>
        <Flex
          css={{
            width: "100%",
            flexDirection: "column",
            marginBottom: "0.9375rem",
          }}
        >
          <Select
            value={lineId}
            onChange={setLineIdOnChange}
            selectSize="block"
            options={lines.map(({ id, name }) => ({ value: id, text: name }))}
          />
        </Flex>
        <Flex
          css={{
            width: "100%",
            flexDirection: "column",
            height: SIZE.PAGE_CONTAINER_HEIGHT,
            overflow: "auto",
          }}
        >
          {targetLine?.stations.map(({ id, name }) => (
            <ListItem
              key={id}
              css={{ padding: "0.5625rem" }}
              onDelete={async () => {
                await deleteSection({ lineId: Number(lineId), stationId: id });
              }}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
    </FlexCenter>
  );
};

export default SectionManagementPage;
