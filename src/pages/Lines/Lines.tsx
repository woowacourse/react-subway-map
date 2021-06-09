import React, { VFC, MouseEventHandler, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import LineAddModal from '../../components/LinesModal/LineAddModal';
import LineModifyModal, { ModifyLine } from '../../components/LinesModal/LineModifyModal';
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
import { Line } from '../../types';
import { LineColorDot, LineList } from './Lines.styles';

const Lines: VFC = () => {
  const APIInfo = useCurrentAPIInfo();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { lines, errorMessage } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const lineAddModal = useModal();
  const lineModifyModal = useModal<Pick<Line, 'id' | 'name' | 'color'>>();

  const onOpenAddModal: MouseEventHandler<HTMLButtonElement> = () => {
    lineAddModal.openModal();
  };

  const onOpenModifyModal = (lineId: number) => () => {
    const selectedLine = lines.find((line) => line.id === lineId) as ModifyLine;

    lineModifyModal.passDataToModal({
      id: selectedLine.id,
      name: selectedLine.name,
      color: selectedLine.color,
    });
    lineModifyModal.openModal();
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
      {lineAddModal.isModalOpen && <LineAddModal onClose={lineAddModal.closeModal} />}
      {lineModifyModal.isModalOpen && (
        <LineModifyModal
          line={lineModifyModal.modalData as ModifyLine}
          onClose={lineModifyModal.closeModal}
        />
      )}
    </CardTemplate>
  );
};

export default Lines;
