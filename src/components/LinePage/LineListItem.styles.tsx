import styled from '@emotion/styled';
import { Line } from '../../interfaces';

export const LineListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.5rem;
  width: 100%;
`;

export const LineColorCircleContainer = styled.div``;

export const LineColorCircle = styled.div<{ color: Line['color'] }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 0.5rem;
`;

export const Name = styled.div`
  line-height: 1rem;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ButtonWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
`;

export const Button = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
