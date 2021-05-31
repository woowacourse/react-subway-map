import { APIReturnTypeLine } from '../../hooks/useLines';
import { Container, LineTag, StationDot } from './SectionGraph.style';

interface SectionGraphProps {
  line: APIReturnTypeLine;
}

const SectionGraph = ({ line }: SectionGraphProps) => (
  <Container borderColor={line.color}>
    <LineTag backgroundColor={line.color}>{line.name}</LineTag>
    {line.stations.map(({ id, name }) => (
      <StationDot key={id} borderColor={line.color}>
        <span>{name}</span>
      </StationDot>
    ))}
  </Container>
);

export default SectionGraph;
export type { SectionGraphProps };
