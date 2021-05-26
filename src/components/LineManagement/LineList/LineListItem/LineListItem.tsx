import { VFC } from 'react';
import { Line } from '../../../../types';
import {
  StyledLineListItem,
  ControlButton,
  LineName,
} from './LineListItem.styles';

interface Props {
  line: Line;
}

const LineListItem: VFC<Props> = ({ line: { name, color } }) => {
  return (
    <StyledLineListItem>
      <div>{color}</div>
      <LineName>{name}</LineName>
      <div>
        <ControlButton>수정</ControlButton>
        <ControlButton>삭제</ControlButton>
      </div>
    </StyledLineListItem>
  );
};

export default LineListItem;
