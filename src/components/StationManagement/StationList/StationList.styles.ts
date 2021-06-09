import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const StyledStationList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 1px solid ${PALETTE.GRAY_300};
  border-radius: 0.5rem;
  width: 100%;
`;
