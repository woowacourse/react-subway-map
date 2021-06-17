import styled from "styled-components";

import { COLOR } from "../../constants";

interface ScrollAreaBlockProps {
  imageUrl?: string;
}

const ScrollAreaBlock = styled.div<ScrollAreaBlockProps>`
  height: 50vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 30px;
    border-radius: 12px;
    background-color: ${COLOR.GRAY_100};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ imageUrl }) => {
      return imageUrl ? `url(${imageUrl})` : COLOR.CYAN_300;
    }};
    border-radius: 12px;
    background-repeat: no-repeat;
    background-position-x: center;
  }
`;

export type { ScrollAreaBlockProps };
export { ScrollAreaBlock };
