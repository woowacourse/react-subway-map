import React, { MouseEventHandler, useMemo, useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Station } from '../../../types';
import { StationPointContainer } from './StationPoint.styles';
import TransferInfo from './TransferInfo/TransferInfo';

interface Props {
  station: Station;
}

const StationPoint: VFC<Props> = ({ station }) => {
  const [isVisibleTransferInfo, setIsVisibleTransferInfo] = useState(false);
  const { stations } = useSelector((state: RootState) => state.station);
  const targetStation: Station = useMemo(() => {
    const dummyStation = {
      id: -1,
      name: '',
      transfer: [],
    };

    if (stations.length === 0) {
      return dummyStation;
    }

    const target = stations.find(({ id }) => station.id === id);

    if (!target) {
      console.error('해당 id를 가진 station 정보가 없습니다.');
      return dummyStation;
    }

    return target;
  }, [stations]);

  const canTransfer = (station: Station) => station.transfer.length > 1;

  const onShowTransferInfo: MouseEventHandler<HTMLLIElement> = () => {
    setIsVisibleTransferInfo(true);
  };

  const onHideTransferInfo: MouseEventHandler<HTMLLIElement> = () => {
    setIsVisibleTransferInfo(false);
  };

  return (
    <StationPointContainer
      canTransfer={canTransfer(targetStation)}
      onMouseEnter={onShowTransferInfo}
      onMouseLeave={onHideTransferInfo}
    >
      {isVisibleTransferInfo && canTransfer(targetStation) && (
        <TransferInfo station={targetStation} />
      )}
      {targetStation.name}
    </StationPointContainer>
  );
};

export default StationPoint;
