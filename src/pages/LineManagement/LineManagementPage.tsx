import { useState } from "react";

import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import ListItem from "../../components/ListItem/ListItem";
import { lines } from "../../mocks/mocks";
import { CIRCLE_COLOR } from "../../constants/color";
import LineAddModal from "./Modal/LineAddModal";

const LineManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

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
              key={id}
              circleColor={CIRCLE_COLOR[color]}
              onUpdate={() => {}}
              onDelete={() => {}}
              style={{ padding: "9px" }}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
      {isAddModalOpened && (
        <LineAddModal
          onClose={() => {
            setIsAddModalOpened(false);
          }}
        />
      )}
    </FlexCenter>
  );
};

export default LineManagementPage;
