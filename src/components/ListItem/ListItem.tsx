import { LiHTMLAttributes, MouseEventHandler } from "react";
import Button from "../Button/Button";
import { FlexAlignCenter } from "../@shared/FlexContainer/FlexContainer";
import { ListItemBlock, ListItemStylesProps, ButtonControls, Circle } from "./ListItem.styles";

export interface Props extends LiHTMLAttributes<HTMLLIElement>, ListItemStylesProps {
  onUpdate?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}

const ListItem = ({ circleColor, onUpdate, onDelete, children }: Props) => (
  <ListItemBlock>
    <FlexAlignCenter>
      <Circle circleColor={circleColor} />
      <div>{children}</div>
    </FlexAlignCenter>
    <ButtonControls>
      {onUpdate && (
        <Button size="sm" buttonTheme="gray" onClick={onUpdate}>
          수정
        </Button>
      )}
      {onDelete && (
        <Button size="sm" buttonTheme="gray" onClick={onDelete}>
          삭제
        </Button>
      )}
    </ButtonControls>
  </ListItemBlock>
);

export default ListItem;
