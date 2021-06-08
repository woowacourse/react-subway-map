import { MapState } from '../../../interfaces/map';
import * as S from './LintList.styles';

interface Props {
  map: MapState;
}

const LineList = ({ map }: Props) => (
  <div key={map.id}>
    <S.Name bgColor={map.color}>{map.name}</S.Name>
    <S.StationList>
      {map.stations.map(station => (
        <S.StationListItem key={station.id} color={map.color}>
          <S.TransferLineList>
            {station.transferLines.map(transferLine => (
              <S.TransferLineListItem key={transferLine.id} bgColor={transferLine.color}>
                {transferLine.name}
              </S.TransferLineListItem>
            ))}
          </S.TransferLineList>
          <S.StationName>{station.name}</S.StationName>
          <S.Line bgColor={map.color}>
            <S.StationIcon isTransfer={station.transferLines.length > 0}></S.StationIcon>
          </S.Line>
        </S.StationListItem>
      ))}
    </S.StationList>
  </div>
);

export default LineList;
