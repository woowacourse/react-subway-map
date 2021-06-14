import React, { useContext, VFC } from 'react';
import { Station } from '../../../../types';
import { LineContext } from '../../LineMap';
import { TransferInfoContainer } from './TransferInfo.styles';

interface TransferInfoProps {
  station: Station;
}

const TransferInfo: VFC<TransferInfoProps> = ({ station }) => {
  const line = useContext(LineContext);

  return (
    <TransferInfoContainer>
      <div className="transfer-info-title">환승역</div>
      {station.transfer.map((lineName, index) => {
        if (lineName === line?.name) {
          return;
        }

        return <p key={index}>{lineName}</p>;
      })}
    </TransferInfoContainer>
  );
};

export default TransferInfo;
