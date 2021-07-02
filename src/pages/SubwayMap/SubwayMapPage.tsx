import Block from "../../components/Block/Block";
import {
  Flex,
  FlexCenter,
} from "../../components/Layout/FlexContainer/FlexContainer";
import Line from "../../components/Line/Line";

import { useLine } from "../../hooks";

import { SIZE } from "../../utils/constants/size";

const SubwayMapPage = () => {
  const { lines } = useLine();

  return (
    <FlexCenter css={{ flexDirection: "column" }}>
      <Block
        css={{
          marginTop: "2.5rem",
          width: SIZE.PAGE_CONTAINER_WIDTH,
          height: SIZE.PAGE_CONTAINER_HEIGHT,
          overflow: "auto",
          alignItems: "flex-start",
          justifyContent: "start",
        }}
      >
        <Flex css={{ flexDirection: "column" }}>
          {lines.map((line) => (
            <Line key={line.name} line={line} />
          ))}
        </Flex>
      </Block>
    </FlexCenter>
  );
};

export default SubwayMapPage;
