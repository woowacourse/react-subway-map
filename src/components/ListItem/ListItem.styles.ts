import styled from "styled-components";
import { COLOR } from "../../constants";

interface CircleProps {
  circleColor?: string;
}

export type ListItemStylesProps = CircleProps;

export const ListItemBlock = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.GRAY_200};
  padding-bottom: 0.625rem;
`;

export const ButtonControls = styled.div`
  display: flex;

  > button:not(:last-child) {
    margin-right: 0.625rem;
  }
`;

export const Circle = styled.div<CircleProps>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 1.5rem;
  background-color: ${({ circleColor = COLOR.SKY_BLUE_500 }) => circleColor};
`;
