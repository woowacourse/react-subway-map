import styled from "styled-components";

import { Flex } from "../Layout/FlexContainer/FlexContainer";

const LineBlock = styled(Flex)`
  flex-direction: column;
  margin-bottom: 6.25rem;
  /* height: 50vh; */
`;

const LineName = styled.p`
  font-size: 1rem;
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #000;
`;

const StationName = styled.p`
  position: absolute;
  top: 10px;
  text-align: center;
  font-size: 1rem;
`;

const Path = styled.div`
  width: 3rem;
  height: 0.2rem;
  background-color: #123123;
`;

export { LineBlock, LineName, Circle, StationName, Path };
