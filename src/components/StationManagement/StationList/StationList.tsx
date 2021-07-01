import { StyledStationList } from './StationList.styles';
import StationListItem from './StationListItem/StationListItem';
import { Station, StationId } from '../../../types';
import { VFC } from 'react';

export interface StationProps {
  stations: Station[];
  deleteStation: (id: StationId) => void;
}

const StationList: VFC<StationProps> = ({ stations, deleteStation }) => {
  return (
    <StyledStationList>
      {stations.map(({ id, name }) => (
        <StationListItem
          key={id}
          name={name}
          onDelete={() => deleteStation(id)}
        />
      ))}
    </StyledStationList>
  );
};

export default StationList;
