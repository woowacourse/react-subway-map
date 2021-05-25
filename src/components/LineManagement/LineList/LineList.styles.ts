import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../../@common/Button/Button.styles';

export const StyledLineList = styled.ul`
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid ${PALETTE.GRAY_300};
`;

export const LineAddButton = styled(Button)`
  width: 6rem;
  align-self: flex-end;
`;
