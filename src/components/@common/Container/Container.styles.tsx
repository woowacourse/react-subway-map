import styled from 'styled-components';
import { FlexDirection } from '../../../types';

interface ContainerProps {
  type?: FlexDirection;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ type }) => type === 'vertical' && 'flex-direction: column;'}
`;

export default Container;
