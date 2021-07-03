import styled from 'styled-components';
import { Container as Box } from '../../components/shared/Box/Box.style';
import PALETTE from '../../constants/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 0.75rem;
  }
  min-height: 70vh;
`;

const MapBox = styled(Box)`
  width: 30rem;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-row-gap: 3rem;
`;

const LineBox = styled(Box)<{ title: string }>`
  min-width: 24rem;

  :before {
    ${({ title }) => title && `content: "${title}";`}
    height: 2rem;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.25rem;
    padding: 0 1rem;
    transform: translateY(-60%);
  }
`;

const Distance = styled.span`
  position: absolute;
  left: 0.5rem;
  bottom: -0.6rem;
  font-size: 0.7rem;
  color: ${PALETTE.GRAY_400};
  height: 1rem;
  background-color: ${PALETTE.WHITE_100};
  padding: 0 0.25rem;
`;

export { Container, MapBox, LineBox, Distance };
