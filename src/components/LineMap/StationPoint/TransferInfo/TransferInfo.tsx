import React, { VFC } from 'react';
import { TransferInfoContainer } from './TransferInfo.styles';

interface TransferInfoProps {
  transferLines: string[];
  currentLineName: string;
}

const TransferInfo: VFC<TransferInfoProps> = ({ transferLines, currentLineName }) => {
  return (
    <TransferInfoContainer>
      <div className="transfer-info-title">환승역</div>
      {transferLines.map((lineName, index) => {
        if (lineName === currentLineName) {
          return;
        }

        return <p key={index}>{lineName}</p>;
      })}
    </TransferInfoContainer>
  );
};

export default TransferInfo;
