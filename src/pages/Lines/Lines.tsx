import React, { FC, MouseEventHandler, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import LineAddModal from '../../components/LinesModal/LineAddModal';
import LineModifyModal, { ModifyLine } from '../../components/LinesModal/LineModifyModal';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO } from '../../constants/appInfo';
import { CONFIRM_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';
import useModal from '../../hooks/useModal/useModal';
import { deleteLine, loadLines } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { LineColorDot, LineList } from './Lines.styles';

const Lines: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { lines } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const addLineModal = useModal();
  const modifyLineModal = useModal(null);

  useEffect(() => {
    dispatch(loadLines(API_INFO[apiOwner].endPoint));
  }, []);

  const onOpenAddModal: MouseEventHandler<HTMLButtonElement> = () => {
    addLineModal.openModal();
  };

  const onOpenModifyModal = (lineId: number) => () => {
    const selectedLine = lines.find((line) => line.id === lineId) as ModifyLine;

    modifyLineModal.passDataToModal({
      id: selectedLine.id,
      name: selectedLine.name,
      color: selectedLine.color,
    });
    modifyLineModal.openModal();
  };

  const onDeleteLine = (lineId: number) => () => {
    if (confirm(CONFIRM_MESSAGE.DELETE_LINE)) {
      dispatch(deleteLine({ baseURL: API_INFO[apiOwner].endPoint, lineId }));
    }
  };

  return (
    <CardTemplate
      titleText={PAGE_INFO.LINES.text}
      templateColor={API_INFO[apiOwner].themeColor[400]}
    >
      <ButtonOnLine onClick={onOpenAddModal}>
        <Add width="80%" color={PALETTE.GRAY[600]} />
      </ButtonOnLine>
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
      {addLineModal.isModalOpen && <LineAddModal onClose={addLineModal.closeModal} />}
      {modifyLineModal.isModalOpen && (
        <LineModifyModal
          line={modifyLineModal.modalData as ModifyLine}
          onClose={modifyLineModal.closeModal}
        />
      )}
    </CardTemplate>
  );
};

export default Lines;
