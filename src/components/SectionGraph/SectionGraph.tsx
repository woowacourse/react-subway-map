import { Line } from '../../types';
import { Container, LineTag, StationDot } from './SectionGraph.style';

interface SectionGraphProps {
  line: Line;
}

const SectionGraph = ({ line }: SectionGraphProps) => (
  <Container borderColor={line.color}>
    <LineTag borderColor={line.color}>{line.name}</LineTag>
    {line.stations.map(({ id, name }) => (
      <StationDot key={id} borderColor={line.color}>
        <span>{name}</span>
      </StationDot>
    ))}
  </Container>
);

export default SectionGraph;
export type { SectionGraphProps };
