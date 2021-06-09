import { useEffect, useState } from "react";

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
import { TEST_ID } from "../../@test/testId";
import { Distance, SectionListItemWrapper } from "./SectionManagementPage.styles";
import { Station } from "../../@types/types";
import useAuth from "../../hooks/useAuth";
import { Redirect } from "react-router";
import { PAGE_PATH } from "../../constants/route";

const SectionManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const { stations, getStations } = useStation();
  const { lines, addSection, deleteSection, getLines } = useLine();
  const { isAuthenticated } = useAuth();

  const [defaultLine] = lines;
  const { selectValue: lineId, setValueOnChange: setLineIdOnChange } = useSelect(String(defaultLine?.id));

  const targetLine = lines.find(({ id }) => id === Number(lineId));

  useEffect(() => {
    getStations();
    getLines();
  }, []);

  const onSectionAddModalOpen = () => {
    setIsAddModalOpened(true);
  };

  const onSectionAddModalClose = () => {
    setIsAddModalOpened(false);
  };

  const onDeleteSection = async (station: Station) => {
    try {
      await deleteSection({ lineId: Number(lineId), stationId: station.id });
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isAuthenticated) {
    return <Redirect to={PAGE_PATH.LOGIN} />;
  }

  const sectionList = targetLine?.stations.map((station, index) => {
    return (
      <SectionListItemWrapper key={station.id}>
        <ListItem
          data-testid={`section-${station.id}`}
          circleColor={CIRCLE_COLOR[targetLine.color]}
          style={{ padding: "0.5625rem" }}
          onUpdate={() => {}}
          onDelete={() => onDeleteSection(station)}
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
          <Button data-testid={TEST_ID.SECTION_MODAL_OPEN_BUTTON} type="button" onClick={onSectionAddModalOpen}>
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
          onClose={onSectionAddModalClose}
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
