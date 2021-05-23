import { StyledLineList } from './LineList.styles';
import LineListItem from './LineListItem/LineListItem';

const LineList = () => {
  return (
    <StyledLineList>
      <LineListItem />
      <LineListItem />
      <LineListItem />
    </StyledLineList>
  );
};

export default LineList;
