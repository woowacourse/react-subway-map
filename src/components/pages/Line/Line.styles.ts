import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';
import { ListItem } from '../../molecules';

const Container = styled.div`
  width: 100%;
  ${FlexCenterBox};
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

const LineListContainer = styled.div`
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

export { Container, LineListContainer, LineItemWithCircle };
