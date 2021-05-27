import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import Select from "../../components/Select/Select";
import { useState } from "react";
import SectionAddModal from "./Modal/SectionAddModal";
import useStation from "../../hooks/useStation";
import useSelect from "../../hooks/@common/useSelect";
import useLine from "../../hooks/useLine";
import useSection from "../../hooks/useSection";
import ListItem from "../../components/ListItem/ListItem";
import { CIRCLE_COLOR } from "../../constants/color";

const SectionManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const { stations } = useStation();
  const { lines } = useLine();
  const { addSection, deleteSection } = useSection();

  const [defaultLine] = lines;
  const { selectValue: lineId, setValueOnChange: setLineIdOnChange } = useSelect(String(defaultLine.id));

  const targetLine = lines.find(({ id }) => id === Number(lineId));

  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>🔁 구간 관리</h2>
          <Button
            type="button"
            onClick={() => {
              setIsAddModalOpened(!isAddModalOpened);
            }}
          >
            구간 추가
          </Button>
        </FlexBetween>
        <Flex style={{ width: "100%", flexDirection: "column", marginBottom: "0.9375rem" }}>
          <Select
            value={lineId}
            onChange={setLineIdOnChange}
            selectSize="block"
            options={lines.map(({ id, name }) => ({ value: id, text: name }))}
          />
        </Flex>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          {targetLine?.stations.map(({ id, name }) => (
            <ListItem
              key={id}
              style={{ padding: "0.5625rem" }}
              onUpdate={() => {}}
              onDelete={async () => {
                await deleteSection({ lineId: Number(lineId), stationId: id });
              }}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
      {isAddModalOpened && targetLine && (
        <SectionAddModal
          onClose={() => {
            setIsAddModalOpened(false);
          }}
          addSection={addSection}
          deleteSection={deleteSection}
          line={targetLine}
          stations={stations}
        />
      )}
    </FlexCenter>
  );
};

export default SectionManagementPage;
