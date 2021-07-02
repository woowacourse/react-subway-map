import LineAddModal from "./Modal/LineAddModal";

import {
  Flex,
  FlexBetween,
  FlexCenter,
} from "../../components/Layout/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import ListItem from "../../components/ListItem/ListItem";

import { useStation, useLine, useModal } from "../../hooks";

import { CIRCLE_COLOR } from "../../constants/color";
import { SIZE } from "../../constants/size";

const LineManagementPage = () => {
  const { open } = useModal();
  const { lines, addLine, deleteLine } = useLine();
  const { stations } = useStation();

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
        <FlexBetween
          css={{ width: "100%", marginBottom: "1rem", alignItems: "center" }}
        >
          <h2>🛤️ 노선 관리</h2>
          <Button
            type="button"
            onClick={() => {
              open(<LineAddModal stations={stations} onAddLine={addLine} />);
            }}
          >
            노선 추가
          </Button>
        </FlexBetween>
        <Flex
          css={{
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
              css={{ padding: "0.5625rem" }}
              onDelete={async () => {
                await deleteLine(id);
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

export default LineManagementPage;
