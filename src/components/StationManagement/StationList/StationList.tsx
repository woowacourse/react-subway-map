import { StyledStationList } from './StationList.styles';
import StationListItem from './StationListItem/StationListItem';

const StationList = () => {
  return (
    <StyledStationList>
      <StationListItem name={'hihi'} onDelete={() => {}} />
      <StationListItem name={'hihi'} onDelete={() => {}} />
      <StationListItem name={'hihi'} onDelete={() => {}} />
    </StyledStationList>
  );
};

export default StationList;
