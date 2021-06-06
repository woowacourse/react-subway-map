import { LiHTMLAttributes, MouseEventHandler, useState } from "react";

import { FlexAlignCenter } from "../@shared/FlexContainer/FlexContainer";
import Button from "../Button/Button";
import Confirm from "../Confirm/Confirm";
import {
  ListItemBlock,
  ListItemStylesProps,
  ButtonControls,
  Circle,
} from "./ListItem.styles";

export interface Props
  extends LiHTMLAttributes<HTMLLIElement>,
    ListItemStylesProps {
  onUpdate?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}

const ListItem = ({
  circleColor,
  onUpdate,
  onDelete,
  children,
  ...props
}: Props) => {
  const [isDeleteConfirmOpened, setDeleteConfirmStatus] = useState(false);

  return (
    <ListItemBlock {...props}>
      <FlexAlignCenter>
        {circleColor && <Circle circleColor={circleColor} />}
        <div>{children}</div>
      </FlexAlignCenter>
      <ButtonControls>
        {onUpdate && (
          <Button type="button" size="sm" buttonTheme="gray" onClick={onUpdate}>
            수정
          </Button>
        )}
        {onDelete && (
          <Button
            type="button"
            size="sm"
            buttonTheme="gray"
            onClick={() => setDeleteConfirmStatus(true)}
          >
            삭제
          </Button>
        )}
      </ButtonControls>
      {isDeleteConfirmOpened && onDelete && (
        <Confirm
          title="삭제하시겠습니까?"
          onConfirm={onDelete}
          onReject={() => setDeleteConfirmStatus(false)}
        />
      )}
    </ListItemBlock>
  );
};

export default ListItem;
