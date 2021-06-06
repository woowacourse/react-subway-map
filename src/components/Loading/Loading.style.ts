import styled, { keyframes } from "styled-components";
import { FlexAlignCenter } from "../@shared/FlexContainer/FlexContainer";

export const loadingAnimation = keyframes`
  from {
    transform:scale(1,1)
  }
  50% {
    transform:scale(1,1.8)
  }
  to {
    transform:scale(1,1)
  }
`;
export interface LoadingBlockProps {
  bgColor: string;
}

export const LoadingBlock = styled(FlexAlignCenter)<LoadingBlockProps>`
  width: 100%;

  div {
    width: 10px;
    height: 40px;
    background-color: ${({ bgColor }) => `${bgColor};`};
  }

  div:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Left = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: -0.16s;
`;

export const Center = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
`;

export const Right = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: 0.16s;
`;
