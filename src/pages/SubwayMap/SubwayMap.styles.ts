import styled from 'styled-components';

interface SubwayMapListItemProps {
  lineColor: string;
}

export const SubwayMapContainer = styled.div`
  margin: 0 3rem 3rem;

  & > div {
    margin-bottom: 2rem;
  }
`;

export const SubwayMapList = styled.ol`
  margin: 1rem 2rem;
`;

export const SubwayMapListItem = styled.li<SubwayMapListItemProps>`
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 1rem;
    border-radius: 50%;
    border: 4px solid ${({ lineColor }) => lineColor};
  }

  &:not(:last-child)::after {
    content: '';
    display: block;
    width: 0.5rem;
    height: 2rem;
    background-color: ${({ lineColor }) => lineColor};
    position: absolute;
    transform: translate(0.375rem, 1.375rem);
  }
`;
