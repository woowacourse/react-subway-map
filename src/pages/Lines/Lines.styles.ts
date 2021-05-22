import styled from 'styled-components';
import PALETTE from '../../constants/palette';

interface LineColorDotProps {
  dotColor: string;
}

export const AddLineButtonContainer = styled.div`
  position: relative;
  height: 3rem;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${PALETTE.GRAY[200]};
    position: absolute;
    top: 50%;
  }

  & > button {
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 0;
    right: 3.5rem;
  }
`;

export const LineList = styled.ul`
  margin: 2.5rem 3.5rem;
`;

export const LineColorDot = styled.span<LineColorDotProps>`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ dotColor }) => dotColor};
  margin-right: 1rem;
`;
