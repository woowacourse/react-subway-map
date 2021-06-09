import useLine from '../../../hooks/useLine';
import { StyledLineList } from './LineList.styles';
import LineListItem from './LineListItem/LineListItem';
import { Line } from '../../../types';
import { Suspense } from 'react';

const LineList = () => {
  const { lines, deleteLine } = useLine();

  return (
    <StyledLineList>
      <Suspense fallback={true}>
        {(lines.data as Line[]).map((line) => (
          <LineListItem
            key={line.id}
            line={line}
            deleteLine={() => deleteLine(line.id)}
          />
        ))}
      </Suspense>
    </StyledLineList>
  );
};

export default LineList;
