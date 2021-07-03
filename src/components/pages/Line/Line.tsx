import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLine, useModal, useStation } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox } from '../../../styles/shared';
import { ModeType } from '../../../type';
import { Button, Header } from '../../atoms';
import { FormProvider } from '../../contexts/FormContext/FormContext';
import { LineEditForm, Modal } from '../../molecules';
import LineAddForm from '../../molecules/LineAddForm/LineAddForm';
import { LineItemWithCircle, ListItemContainer } from './Line.styles';

const Line = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { stations, getAllStations } = useStation(host);
  const {
    lines,
    getAllLines,
    addLine,
    addLineResponse,
    editLine,
    editLineResponse,
    deleteLine,
    deleteLineResponse,
  } = useLine(host);

  const { isModalOpen, open: openModal, onClickClose, close: closeModal } = useModal(false);

  const [mode, setMode] = useState<ModeType>('ADD');
  const [selectedLineId, setSelectedLineId] = useState<number>();

  const openAddModal = () => {
    setMode('ADD');
    openModal();
  };

  const openEditModal = () => {
    setMode('EDIT');
    openModal();
  };

  const onDeleteLine = (lineId: number) => {
    if (!window.confirm('해당 노선을 정말로 삭제하시겠습니까?')) return;

    deleteLine(`${lineId}`);
  };

  useEffect(() => {
    getAllLines();
  }, [addLineResponse, editLineResponse, deleteLineResponse]);

  useEffect(() => {
    getAllStations();
    getAllLines();
  }, []);

  return (
    <FullVerticalCenterBox>
      <Header hasExtra>
        <h3>🚉 노선 관리</h3>
        <Button onClick={openAddModal}>노선 추가</Button>
      </Header>

      <ListItemContainer>
        {lines?.map(({ id, name, color }) => {
          return (
            <LineItemWithCircle
              key={id}
              content={name}
              onClickModify={() => {
                setSelectedLineId(id);
                openEditModal();
              }}
              onClickDelete={() => {
                onDeleteLine(id);
              }}
              option={{ color }}
            />
          );
        })}
      </ListItemContainer>
      {isModalOpen && (
        <Modal onClickClose={onClickClose}>
          <Header>
            <h3>{mode === 'ADD' ? '🛤️ 노선 추가' : '🛤️ 노선 수정'}</h3>
          </Header>
          {mode === 'ADD' ? (
            <FormProvider submitFunc={addLine}>
              <LineAddForm stations={stations || []} closeModal={closeModal} />
            </FormProvider>
          ) : (
            <FormProvider submitFunc={editLine}>
              <LineEditForm closeModal={closeModal} selectedLineId={selectedLineId} />
            </FormProvider>
          )}
        </Modal>
      )}
    </FullVerticalCenterBox>
  );
};

export default Line;
