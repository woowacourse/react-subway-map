import styled from '@emotion/styled';
import { ScrollBox } from '../../../styles/shared';

const ListItemContainer = styled(ScrollBox)`
  margin-top: 5rem;
`;

const LineItem = styled.ul`
  margin-bottom: 2rem;

  & > span {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 4rem;
  }

  &::before {
    content: '';
    display: inline-block;
    margin-right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
`;

const StationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 6rem;
`;

const StationItem = styled.li`
  display: inline-block;
  position: relative;
  width: 2rem;
  height: 2rem;
  border: 5px solid black;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  margin-right: 2rem;
  margin-bottom: 2rem;

  p {
    position: absolute;
    min-width: max-content;
    transform: translateY(-4rem) rotate(-45deg);
    font-weight: bold;
  }

  &::after {
    position: absolute;
    top: 0.4rem;
    content: '';
    display: block;
    width: 2.5rem;
    height: 0.125rem;
    border-top: 5px solid #26272b;
    border-bottom: 5px solid #26272b;
    background-color: #26272b;
    margin-left: 1.5rem;
  }

  &:last-child::after {
    display: none;
  }
`;

export { ListItemContainer, LineItem, StationWrapper, StationItem };
