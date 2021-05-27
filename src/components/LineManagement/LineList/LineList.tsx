import useLine from '../../../hooks/useLine';
import { StyledLineList } from './LineList.styles';
import LineListItem from './LineListItem/LineListItem';
import { Line } from '../../../types';

const LineList = () => {
  const { lines, deleteLine } = useLine();

  return (
    <StyledLineList>
      {!lines.isLoading &&
        (lines.data as Line[]).map((line) => (
          <LineListItem
            key={line.id}
            line={line}
            deleteLine={() => deleteLine(line.id)}
          />
        ))}
    </StyledLineList>
  );
};

export default LineList;
