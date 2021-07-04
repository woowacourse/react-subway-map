import React, { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Dimmed from '../../components/@common/Dimmed/Dimmed';
import Add from '../../components/@common/Icon/Add';
import Loading from '../../components/@common/Loading/Loading';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import ListItem from '../../components/@shared/ListItem/ListItem';
import LineAddModal from '../../components/LinesModal/LineAddModal';
import LineModifyModal, { ModifyLine } from '../../components/LinesModal/LineModifyModal';
import { PAGE_INFO } from '../../constants/appInfo';
import { CONFIRM_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';
import useLines from '../../hooks/useLines';
import useModal from '../../hooks/useModal';
import useThemeColor from '../../hooks/useThemeColor';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { deleteLine } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { LineColorDot, LineList } from './Lines.styles';

const Lines = (): JSX.Element => {
  const themeColor = useThemeColor();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { lines, isLoading, errorMessage } = useLines();
  const dispatch = useAppDispatch();
  const lineAddModal = useModal();
  const lineModifyModal = useModal();

  useUpdateEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  }, [errorMessage]);

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

  return (
    <CardTemplate titleText={PAGE_INFO.LINES.text} templateColor={themeColor[400]}>
      {isLoading && (
        <Dimmed backgroundColor="rgba(255, 255, 255, 0.2)">
          <Loading />
        </Dimmed>
      )}
      {isLogin && (
        <ButtonOnLine onClick={onOpenAddModal}>
          <Add width="80%" color={PALETTE.GRAY[600]} />
        </ButtonOnLine>
      )}
      {lines && (
        <LineList>
          {lines.map((line) => (
            <ListItem
              key={line.id}
              onDelete={onDeleteLine(line.id)}
              onModify={onOpenModifyModal(line.id)}
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
