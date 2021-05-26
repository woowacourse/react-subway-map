import useLine from '../../../hooks/useLine';
import { StyledLineList } from './LineList.styles';
import LineListItem from './LineListItem/LineListItem';
import { Line } from '../../../types';

const LineList = () => {
  const { lines } = useLine();
  return (
    <StyledLineList>
      {lines.isLoading ? (
        <div>로딩중</div>
      ) : (
        (lines.data as Line[]).map((line) => {
          <LineListItem key={line.id} line={line} />;
        })
      )}
    </StyledLineList>
  );
};

export default LineList;
