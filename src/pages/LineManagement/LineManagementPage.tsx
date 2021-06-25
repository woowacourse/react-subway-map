import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import ListItem from "../../components/ListItem/ListItem";
import { CIRCLE_COLOR } from "../../constants/color";
import LineAddModal from "./Modal/LineAddModal";
import useLine from "../../hooks/useLine";
import useStation from "../../hooks/useStation";
import { Line } from "../../@types/types";
import { Redirect } from "react-router";
import { PAGE_PATH } from "../../constants/route";
import useAuth from "../../hooks/useAuth";
import { NONAME } from "dns";
import { TEST_ID } from "../../@test/testId";

const LineManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const { lines, addLine, deleteLine, getLines } = useLine();
  const { stations, getStations } = useStation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getStations();
    getLines();
  }, []);

  const onDeleteLine = async (id: Line["id"]) => {
    try {
      await deleteLine(id);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isAuthenticated) {
    return <Redirect to={PAGE_PATH.LOGIN} />;
  }

  const closeAddLineModal = () => {
    setIsAddModalOpened(false);
  };

  return (
    <FlexCenter data-testid={TEST_ID.LINE_PAGE}>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem", alignItems: "center" }}>
          <h2>🛤️ 노선 관리</h2>
          <Button
            data-testid={TEST_ID.LINE_MODAL_OPEN_BUTTON}
            type="button"
            onClick={() => {
              setIsAddModalOpened(!isAddModalOpened);
            }}
          >
            노선 추가
          </Button>
        </FlexBetween>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          {lines.map(({ id, color, name }) => (
            <ListItem
              data-testid={`line-item-${name}`}
              role="line-item"
              key={id}
              circleColor={CIRCLE_COLOR[color]}
              style={{ padding: "9px" }}
              onDelete={() => onDeleteLine(id)}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
      {isAddModalOpened && <LineAddModal stations={stations} closeModal={closeAddLineModal} addLine={addLine} />}
    </FlexCenter>
  );
};

export default LineManagementPage;
