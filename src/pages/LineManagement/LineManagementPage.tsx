import LineAddModal from "./Modal/LineAddModal";
import { Button, Block, ListItem, FormProvider } from "../../components";
import { Flex, FlexCenter, FlexBetween } from "../../components";

import { useStation, useLine, useModal } from "../../hooks";

import { CIRCLE_COLOR } from "../../constants";
import { SIZE } from "../../constants";

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
              open(
                <FormProvider>
                  <LineAddModal stations={stations} onAddLine={addLine} />
                </FormProvider>
              );
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
