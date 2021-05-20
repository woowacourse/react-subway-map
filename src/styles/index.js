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
