import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../Button/Button';

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${PALETTE.GRAY[300]};
  padding: 0.75rem 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const TrashBinButton = styled(Button)`
  width: 2.25rem;
  height: 2.25rem;
`;
