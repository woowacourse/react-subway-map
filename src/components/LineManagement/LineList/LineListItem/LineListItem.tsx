import { VFC } from 'react';
import { Line } from '../../../../types';
import {
  StyledLineListItem,
  ControlButton,
  LineName,
} from './LineListItem.styles';

interface Props {
  line: Line;
  deleteLine: () => void;
}

const LineListItem: VFC<Props> = ({ line: { name, color }, deleteLine }) => {
  return (
    <StyledLineListItem>
      <LineName lineColor={color}> {name}</LineName>
      <div>
        <ControlButton>수정</ControlButton>
        <ControlButton onClick={deleteLine}>삭제</ControlButton>
      </div>
    </StyledLineListItem>
  );
};

export default LineListItem;
