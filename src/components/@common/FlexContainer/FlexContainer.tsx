import styled from 'styled-components';

interface Props {
  direction?: 'column';
  justifyContent?: 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-end';
}

const FlexContainer = styled.div<Props>`
  display: flex;
  ${({ direction }) => direction && `direction: ${direction};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`};
`;

export default FlexContainer;
