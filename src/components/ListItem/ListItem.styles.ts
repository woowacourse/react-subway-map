import styled from "styled-components";

import { COLOR } from "../../constants/color";

interface CircleProps {
  circleColor?: string;
}

const ListItemBlock = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.GRAY_300};
  padding-bottom: 0.625rem;
`;

const ButtonControls = styled.div`
  display: flex;

  > button:not(:last-child) {
    margin-right: 0.625rem;
  }
`;

const Circle = styled.div<CircleProps>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 1.5rem;
  ${({ circleColor }) => `background-color: ${circleColor}`};
`;

export type { CircleProps };
export { ListItemBlock, ButtonControls, Circle };
