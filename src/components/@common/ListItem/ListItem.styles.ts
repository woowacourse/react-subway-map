import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../Button/Button';
import FlexContainer from '../FlexContainer/FlexContainer';

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${PALETTE.GRAY[300]};
  padding: 0.75rem 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const ListContent = styled(FlexContainer)`
  flex-grow: 1;
`;

export const ListItemButton = styled(Button)`
  width: 2.25rem;
  height: 2.25rem;
  margin-left: 1rem;
`;
