import styled from "styled-components";

interface ScrollAreaBlockProps {
  imageUrl?: string;
}

type ScrollAreaStylesProps = ScrollAreaBlockProps;

const ScrollAreaBlock = styled.div<ScrollAreaBlockProps>`
  height: 50vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 30px;
    border-radius: 12px;
    background-color: #e7f4ff;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ imageUrl, theme }) =>
      imageUrl ? `url(${imageUrl})` : theme.PRIMARY};
    border-radius: 12px;
    background-repeat: no-repeat;
    background-position-x: center;
  }
`;

export type { ScrollAreaStylesProps };
export { ScrollAreaBlock };
