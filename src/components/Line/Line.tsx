import { HTMLAttributes } from "react";

import { Flex, FlexAlignCenter } from "../Layout/FlexContainer/FlexContainer";

import { LineBlock, LineName, Circle, StationName, Path } from "./Line.styles";
import { Line as LineType } from "../../types/line";
import { CIRCLE_COLOR } from "../../constants/color";

interface Props extends HTMLAttributes<HTMLDivElement> {
  line: LineType;
}

const Line = ({ line, ...props }: Props) => {
  const { name, color, stations } = line;

  const lastStation = stations[stations.length - 1];

  return (
    <LineBlock {...props}>
      <LineName css={{ color: CIRCLE_COLOR[color] }}>{name}</LineName>
      <FlexAlignCenter>
        {stations.slice(0, -1).map(({ name }) => (
          <>
            <Flex style={{ flexDirection: "column", position: "relative" }}>
              <Circle css={{ backgroundColor: CIRCLE_COLOR[color] }} />
              <StationName>{name}</StationName>
            </Flex>
            <Path />
          </>
        ))}
        <Flex style={{ flexDirection: "column", position: "relative" }}>
          <Circle css={{ backgroundColor: CIRCLE_COLOR[color] }} />
          <StationName>{lastStation.name}</StationName>
        </Flex>
      </FlexAlignCenter>
    </LineBlock>
  );
};

export default Line;
export type { Props };
