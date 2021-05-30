import { css } from 'styled-components';

export const Flex = ({
  direction = 'row',
  justify = 'flex-start',
  items = 'stretch',
  wrap = 'nowrap',
}) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${items};
  flex-wrap: ${wrap};
`;

export const fadeIn = css`
  opacity: 1;
  transition: opacity 1000ms;
`;

export const fadeOut = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity 800ms, visibility 800ms;
`;
