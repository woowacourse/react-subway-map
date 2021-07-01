import { StyledStationList } from './StationList.styles';
import StationListItem from './StationListItem/StationListItem';
import { Station, StationId } from '../../../types';
import { VFC } from 'react';

export interface StationProps {
  stations: Station[];
  deleteStation: (id: StationId) => void;
}

const StationList: VFC<StationProps> = ({ stations, deleteStation }) => {
  const onDelete = (id: number) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    deleteStation(id);
  };

  return (
    <StyledStationList>
      {stations.map(({ id, name }) => (
        <StationListItem key={id} name={name} onDelete={() => onDelete(id)} />
      ))}
    </StyledStationList>
  );
};

export default StationList;
