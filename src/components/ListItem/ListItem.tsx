import { LiHTMLAttributes } from "react";

import { Button, Confirm, FormProvider } from "../";
import { FlexAlignCenter } from "../Layout/";

import { useModal } from "../../hooks";

import {
  ListItemBlock,
  ListItemStylesProps,
  ButtonControls,
  Circle,
} from "./ListItem.styles";

export interface Props
  extends LiHTMLAttributes<HTMLLIElement>,
    ListItemStylesProps {
  onUpdate?: () => void;
  onDelete?: () => void;
}

const ListItem = ({
  circleColor,
  onUpdate,
  onDelete,
  children,
  ...props
}: Props) => {
  const { open } = useModal();

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
            onClick={() =>
              open(
                <FormProvider>
                  <Confirm title="삭제하시겠습니까?" onConfirm={onDelete} />
                </FormProvider>
              )
            }
          >
            삭제
          </Button>
        )}
      </ButtonControls>
    </ListItemBlock>
  );
};

export default ListItem;
