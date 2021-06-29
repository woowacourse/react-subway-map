import styled from "styled-components";

export type ScrollAreaStylesProps = ScrollAreaBlockProps;

interface ScrollAreaBlockProps {
  scrollBarImage?: string;
  scrollBarColor?: string;
  scrollTrackColor?: string;
  scrollTrackWidth?: string;
}

export const ScrollAreaBlock = styled.div<ScrollAreaBlockProps>`
  height: 500px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: ${({ scrollTrackWidth }) => (scrollTrackWidth ? scrollTrackWidth : "30px")};
    border-radius: 12px;
    background-color: ${({ scrollTrackColor }) => scrollTrackColor};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-repeat: no-repeat;
    background-position-x: center;
    background-image: ${({ scrollBarImage }) => `url(${scrollBarImage})`};
    background-color: ${({ scrollBarColor }) => scrollBarColor};
  }
`;
