import styled from 'styled-components';

interface Props {
  direction?: 'column';
  justifyContent?: 'space-between' | 'center';
  alignItems?: 'center';
}

const FlexContainer = styled.div<Props>`
  display: flex;
  ${({ direction }) => direction && `direction: ${direction};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`};
`;

export default FlexContainer;
