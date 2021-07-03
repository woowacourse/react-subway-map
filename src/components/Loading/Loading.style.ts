import styled, { keyframes } from "styled-components";

import { FlexCenter } from "../Layout/FlexContainer/FlexContainer";

interface LoadingBlockProps {
  bgColor: string;
}
const loadingAnimation = keyframes`
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

const LoadingBlock = styled(FlexCenter)<LoadingBlockProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  div {
    width: 10px;
    height: 40px;
    background-color: ${({ bgColor }) => `${bgColor};`};
  }

  div:not(:last-child) {
    margin-right: 10px;
  }
`;

const Left = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: -0.16s;
`;

const Center = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
`;

const Right = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: 0.16s;
`;

export type { LoadingBlockProps };
export { LoadingBlock, Left, Center, Right };
