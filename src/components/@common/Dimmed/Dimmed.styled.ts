import styled from 'styled-components';
import { Z_INDEX } from '../../../constants/css';

interface StyledDimmedProps {
  backgroundColor: string;
}
export const StyledDimmed = styled.div<StyledDimmedProps>`
  display: flex;
  position: fixed;
  z-index: ${Z_INDEX.DIMMED};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
