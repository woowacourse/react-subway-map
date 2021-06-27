import useLine from '../../../service/hooks/useLine';
import { StyledLineList } from './LineList.styles';
import LineListItem from './LineListItem/LineListItem';
import { Line } from '../../../types';
import { Suspense } from 'react';
import useLogin from '../../../service/hooks/useLogin';

const LineList = () => {
  const { accessToken } = useLogin();
  const { linesQuery, deleteLine } = useLine(accessToken);

  return (
    <StyledLineList>
      <Suspense fallback={true}>
        {(linesQuery.data as Line[]).map((line) => (
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
