import { StyledStationList } from './StationList.styles';
import StationListItem from './StationListItem/StationListItem';
import { Station } from '../../../types';
import useStation from '../../../hooks/useStation';

const StationList = () => {
  const { stations, deleteStation } = useStation();

  return (
    <StyledStationList>
      {stations.isLoading ? (
        <div>로딩중</div>
      ) : (
        (stations.data as Station[]).map(({ id, name }) => (
          <StationListItem
            key={id}
            name={name}
            onDelete={() => deleteStation(id)}
          />
        ))
      )}
    </StyledStationList>
  );
};

export default StationList;
