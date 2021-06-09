import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { LABEL_TEXT } from '../../../constants/a11y';
import { RootState } from '../../../redux/store';
import Pencil from '../Icon/Pencil';
import TrashBin from '../Icon/TrashBin';
import { ListContent, ListItemButton, StyledListItem } from './ListItem.styles';

interface Props {
  children: React.ReactNode;
  onModify?: () => void;
  onDelete?: () => void;
}

const ListItem: FC<Props> = ({ children, onModify, onDelete, ...options }) => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <StyledListItem {...options}>
      <ListContent alignItems="center">{children}</ListContent>
      {isLogin && (
        <>
          ㄴ
          {onModify && (
            <ListItemButton
              type="button"
              aria-label={LABEL_TEXT.MODIFY_BUTTON}
              buttonType="round"
              isColored={false}
              onClick={onModify}
            >
              <Pencil size="70%" />
            </ListItemButton>
          )}
          {onDelete && (
            <ListItemButton
              type="button"
              aria-label={LABEL_TEXT.DELETE_BUTTON}
              buttonType="round"
              isColored={false}
              onClick={onDelete}
            >
              <TrashBin size="70%" />
            </ListItemButton>
          )}
        </>
      )}
    </StyledListItem>
  );
};

export default ListItem;
