import { useState } from "react";

import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import Select from "../../components/Select/Select";
import SectionAddModal from "./Modal/SectionAddModal";
import useStation from "../../hooks/useStation";
import useSelect from "../../hooks/@common/useSelect";
import useLine from "../../hooks/useLine";
import ListItem from "../../components/ListItem/ListItem";
import { CIRCLE_COLOR } from "../../constants/color";
import TEST_ID from "../../@test/testId";
import { Distance, SectionListItemWrapper } from "./SectionManagementPage.styles";

const SectionManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const { stations } = useStation();
  const { lines, addSection, deleteSection } = useLine();

  const [defaultLine] = lines;
  const { selectValue: lineId, setValueOnChange: setLineIdOnChange } = useSelect(String(defaultLine?.id));

  const targetLine = lines.find(({ id }) => id === Number(lineId));

  const sectionList = targetLine?.stations.map((station, index) => {
    return (
      <SectionListItemWrapper key={station.id}>
        <ListItem
          data-testid={`section-${station.id}`}
          circleColor={CIRCLE_COLOR[targetLine.color]}
          style={{ padding: "0.5625rem" }}
          onUpdate={() => {}}
          onDelete={async () => {
            await deleteSection({ lineId: Number(lineId), stationId: station.id });
          }}
        >
          {station.name}
        </ListItem>
        {index !== targetLine?.stations.length - 1 && <Distance>{targetLine?.sections[index].distance}km</Distance>}
      </SectionListItemWrapper>
    );
  });

  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>🔁 구간 관리</h2>
          <Button
            data-testid={TEST_ID.SECTION_MODAL_OPEN_BUTTON}
            type="button"
            onClick={() => {
              setIsAddModalOpened(true);
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
        <Flex style={{ width: "100%", flexDirection: "column" }}>{sectionList}</Flex>
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
