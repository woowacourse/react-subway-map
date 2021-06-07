import { useState } from "react";

import LineAddModal from "./Modal/LineAddModal";

import { Button, Block, ListItem } from "../../components/";
import { Flex, FlexCenter, FlexBetween } from "../../components/";

import useLine from "../../hooks/useLine";
import useStation from "../../hooks/useStation";

import { CIRCLE_COLOR } from "../../constants/color";
import { SIZE } from "../../constants/size";

const LineManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const { lines, addLine, deleteLine } = useLine();
  const { stations } = useStation();

  return (
    <FlexCenter>
      <Block
        style={{
          marginTop: "2.5rem",
          width: SIZE.PAGE_CONTAINER_WIDTH,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <FlexBetween
          style={{ width: "100%", marginBottom: "1rem", alignItems: "center" }}
        >
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
        <Flex
          style={{
            width: "100%",
            flexDirection: "column",
            height: SIZE.PAGE_CONTAINER_HEIGHT,
            overflow: "auto",
          }}
        >
          {lines.map(({ id, color, name }) => (
            <ListItem
              key={id}
              circleColor={CIRCLE_COLOR[color]}
              style={{ padding: "0.5625rem" }}
              onDelete={async () => {
                await deleteLine(id);
              }}
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
          onAddLine={addLine}
        />
      )}
    </FlexCenter>
  );
};

export default LineManagementPage;
