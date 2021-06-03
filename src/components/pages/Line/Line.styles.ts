import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/css';
import { ScrollBox } from '../../../styles/shared';
import { Header } from '../../atoms';
import { ListItem } from '../../molecules';

const ListItemContainer = styled(ScrollBox)`
  margin-top: 2rem;
`;

const LineItemWithCircle = styled(ListItem)`
  position: relative;
  padding: 1rem 2.5rem;
  &::before {
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${({ option }) => option?.color};
    position: absolute;
    left: 0px;
  }
`;

const LookUpButtonWrapper = styled.div`
  ${FlexCenter};
`;

const LineTitle = styled(Header)`
  margin-bottom: 2rem;
`;

export { LineItemWithCircle, ListItemContainer, LookUpButtonWrapper, LineTitle };
