import { useState } from "react";

import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import ListItem from "../../components/ListItem/ListItem";
import { CIRCLE_COLOR } from "../../constants/color";
import LineAddModal from "./Modal/LineAddModal";
import useLine from "../../hooks/useLine";
import useStation from "../../hooks/useStation";
import { Line } from "../../@types/types";

const LineManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const { lines, addLine, deleteLine } = useLine();
  const { stations } = useStation();

  const onDeleteLine = async (id: Line["id"]) => {
    try {
      await deleteLine(id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem", alignItems: "center" }}>
          <h2>🛤️ 노선 관리</h2>
          <Button
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
              data-testid={`line-${id}`}
              key={id}
              circleColor={CIRCLE_COLOR[color]}
              style={{ padding: "9px" }}
              onUpdate={() => {}}
              onDelete={() => onDeleteLine(id)}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
      {isAddModalOpened && (
        <LineAddModal
          stations={stations}
          onClose={() => {
            setIsAddModalOpened(false);
          }}
          addLine={addLine}
        />
      )}
    </FlexCenter>
  );
};

export default LineManagementPage;
