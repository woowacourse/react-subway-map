import {
  StyledLineListItem,
  ControlButton,
  LineName,
} from './LineListItem.styles';

const LineListItem = () => {
  return (
    <StyledLineListItem>
      <LineName>1호선</LineName>
      <div>
        <ControlButton>수정</ControlButton>
        <ControlButton>삭제</ControlButton>
      </div>
    </StyledLineListItem>
  );
};

export default LineListItem;
