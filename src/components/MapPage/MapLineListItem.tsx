import * as S from './MapLineListItem.styles';
import { MapLine, MapStation } from '../../interfaces';
import { useState } from 'react';

interface MapStationListItemProps {
  lineColor: MapLine['color'];
  station: MapStation;
}
interface MapLineListItemProps {
  line: MapLine;
}

const MapStationListItem = ({ lineColor, station }: MapStationListItemProps) => {
  const [isMouseOverTransferLineDot, setMouseOverTransferLineDot] = useState(false);

  const handleShowTransferLines = () => {
    if (station.transferLines.length === 0) return;
    setMouseOverTransferLineDot(true);
  };

  const handleHideTransferLines = () => {
    if (station.transferLines.length === 0) return;
    setMouseOverTransferLineDot(false);
  };

  return (
    <S.StationLine color={lineColor}>
      <S.StationName>{station.name}</S.StationName>
      <S.StationDot
        hasTransferLines={station.transferLines.length > 0}
        onMouseOver={handleShowTransferLines}
        onMouseLeave={handleHideTransferLines}
      ></S.StationDot>
      {isMouseOverTransferLineDot && (
        <S.Bubble>
          <S.BubbleTitle>환승역 정보</S.BubbleTitle>
          {station.transferLines.map(line => (
            <S.TransferLineName key={line.id} color={line.color}>
              {line.name}
            </S.TransferLineName>
          ))}
        </S.Bubble>
      )}
    </S.StationLine>
  );
};

const MapLineListItem = ({ line }: MapLineListItemProps) => {
  return (
    <S.MapLineListItem>
      <S.LineContainer>
        <S.LineName color={line.color}>{line.name}</S.LineName>
        {line.stations.map(station => (
          <MapStationListItem key={station.id} lineColor={line.color} station={station}></MapStationListItem>
        ))}
      </S.LineContainer>
    </S.MapLineListItem>
  );
};

export default MapLineListItem;
