import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Pencil from '../../@common/Icon/Pencil';
import TrashBin from '../../@common/Icon/TrashBin';

import { ListContent, ListItemButton, StyledListItem } from './ListItem.styles';

interface Props {
  children: React.ReactNode;
  onModify?: () => void;
  onDelete?: () => void;
}

// TODO: 컴포넌트 이름 변경 고려하기
const ListItem: FC<Props> = ({ children, onModify, onDelete }) => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <StyledListItem>
      <ListContent alignItems="center">{children}</ListContent>
      {isLogin && onModify && (
        <ListItemButton type="button" buttonType="round" isColored={false} onClick={onModify}>
          <Pencil width="70%" />
        </ListItemButton>
      )}
      {isLogin && onDelete && (
        <ListItemButton type="button" buttonType="round" isColored={false} onClick={onDelete}>
          <TrashBin width="70%" />
        </ListItemButton>
      )}
    </StyledListItem>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  onModify: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListItem;
