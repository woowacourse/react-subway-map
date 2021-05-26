import { StyledStationList } from './StationList.styles';
import StationListItem from './StationListItem/StationListItem';
import { Station } from '../../../types';
import useStation from '../../../hooks/useStation';

const StationList = () => {
  const { stations } = useStation();

  return (
    <StyledStationList>
      {stations.isLoading ? (
        <div>로딩중</div>
      ) : (
        (stations.data as Station[]).map(({ name }) => (
          <StationListItem name={name} onDelete={() => {}} />
        ))
      )}
    </StyledStationList>
  );
};

export default StationList;
