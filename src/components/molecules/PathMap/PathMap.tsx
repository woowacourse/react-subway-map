import { IStationRes } from '../../../type';
import { PathMapWrapper, StationWrapper } from './PathMap.styled';

export interface IPathMapProp {
  orderedStations: IStationRes[] | undefined;
}

const PathMap = ({ orderedStations }: IPathMapProp) => {
  return (
    <PathMapWrapper>
      {orderedStations?.map(station => (
        <StationWrapper key={station.id}>{station.name}</StationWrapper>
      ))}
    </PathMapWrapper>
  );
};

export default PathMap;
