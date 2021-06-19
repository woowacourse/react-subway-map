import React, { MouseEventHandler, useEffect, VFC } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import LineModifyModal, { ModifyLine } from '../../components/LineModifyModal/LineModifyModal';
import LineAddModal from '../../components/LinesAddModal/LineAddModal';
import { LABEL_TEXT } from '../../constants/a11y';
import { PAGE_INFO } from '../../constants/appInfo';
import { CONFIRM_MESSAGE } from '../../constants/message';
import { Palette } from '../../constants/palette';
import { TEST_ID } from '../../constants/test';
import useCurrentAPIInfo from '../../hooks/@shared/useCurrentAPIInfo/useCurrentAPIInfo';
import useModal from '../../hooks/@shared/useModal/useModal';
import useUpdateEffect from '../../hooks/@shared/useUpdateEffect/useUpdateEffect';
import { deleteLine, loadLines } from '../../redux/slice/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { LineColorDot, LineList } from './Lines.styles';

const Lines: VFC = () => {
  const APIInfo = useCurrentAPIInfo();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { lines, errorMessage } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const modal = useModal();

  const onOpenAddModal: MouseEventHandler<HTMLButtonElement> = () => {
    modal.openModal(<LineAddModal />);
  };

  const onOpenModifyModal = (lineId: number) => () => {
    const selectedLine = lines.find((line) => line.id === lineId) as ModifyLine;

    modal.openModal(<LineModifyModal line={selectedLine} />);
  };

  const onDeleteLine = (lineId: number) => () => {
    if (confirm(CONFIRM_MESSAGE.DELETE_LINE)) {
      dispatch(deleteLine(lineId));
    }
  };

  useEffect(() => {
    dispatch(loadLines());
  }, []);

  useUpdateEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  }, [errorMessage]);

  return (
    <CardTemplate titleText={PAGE_INFO.LINES.text} templateColor={APIInfo.themeColor}>
      {isLogin && (
        <ButtonOnLine onClick={onOpenAddModal} aria-label={LABEL_TEXT.LINE_ADD_BUTTON}>
          <Add size="80%" color={Palette.GRAY_600} />
        </ButtonOnLine>
      )}
      {lines && (
        <LineList>
          {lines.map((line) => (
            <ListItem
              key={line.id}
              onDelete={onDeleteLine(line.id)}
              onModify={onOpenModifyModal(line.id)}
              data-testid={TEST_ID.LINE_LIST_ITEM}
            >
              <LineColorDot dotColor={line.color} />
              {line.name}
            </ListItem>
          ))}
        </LineList>
      )}
    </CardTemplate>
  );
};

export default Lines;
