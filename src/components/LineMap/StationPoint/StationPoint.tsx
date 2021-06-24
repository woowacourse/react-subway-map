import React, { MouseEventHandler, ReactNode, useState, VFC } from 'react';
import { Station } from '../../../types';
import { StationPointContainer } from './StationPoint.styles';

interface Props {
  targetStation: Station;
  transferInfo?: ReactNode;
}

const StationPoint: VFC<Props> = ({ targetStation, transferInfo }) => {
  const [isVisibleTransferInfo, setIsVisibleTransferInfo] = useState(false);
  const canTransfer = (station: Station) => station.transfer.length > 1;

  const onShowTransferInfo: MouseEventHandler<HTMLLIElement> = () => {
    if (!canTransfer(targetStation)) {
      return;
    }

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
      {isVisibleTransferInfo && transferInfo}
      {targetStation.name}
    </StationPointContainer>
  );
};

export default StationPoint;
