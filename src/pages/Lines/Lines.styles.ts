import styled from 'styled-components';

interface LineColorDotProps {
  dotColor: string;
}

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
