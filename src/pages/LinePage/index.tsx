import React, { useEffect, useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Modal from 'components/shared/Modal/Modal';
import LineModal from 'components/LineModal/LineModal';
import { ButtonType, Line, Station } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import { API_STATUS } from 'constants/api';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from 'constants/messages';
import { requestDeleteLine, requestGetLines } from 'request/line';
import { requestGetStations } from 'request/station';
import Styled from './styles';

const LinePage = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [stations, setStations] = useState<Station[]>([]);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedLine, setSelectedLine] = useState<Line>();
  const [modalTitle, setModalTitle] = useState<string>('');

  const getLines = async () => {
    const res = await requestGetLines();

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_LINES);
    } else if (res.status === API_STATUS.FULFILLED) {
      setLines(res.data);
    }
  };

  const getStations = async () => {
    const res = await requestGetStations();

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setStations(res.data);
    }
  };

  const deleteLine = async (id: Line['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    const res = await requestDeleteLine(id);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_DELETE_LINE);
    } else if (res.status === API_STATUS.FULFILLED) {
      await getLines();
    }
  };

  const openLineCreateModal = async () => {
    setModalOpen(true);
    setModalTitle('노선 생성');

    await getStations();
  };

  const openLineEditModal = async (line: Line) => {
    setSelectedLine(line);
    setModalOpen(true);
    setModalTitle('노선 수정');
  };

  const closeModal = async () => {
    setModalOpen(false);
    setSelectedLine(undefined);
  };

  const selectedColors = lines.map((line) => line.color);

  useEffect(() => {
    const fetchLines = async () => {
      await getLines();
    };

    fetchLines();
  }, []);

  return (
    <>
      <CardLayout title={'노선 관리'}>
        <Styled.AddButtonWrapper>
          <TextButton
            text="노선 추가"
            styleType={ButtonType.FILLED}
            onClick={openLineCreateModal}
          />
        </Styled.AddButtonWrapper>
        <Styled.LinesContainer>
          {lines?.map((line) => (
            <Styled.LineItem key={line.id}>
              <Styled.Color color={line.color}></Styled.Color>
              {line.name}
              <Styled.ButtonsContainer>
                <IconButton onClick={() => openLineEditModal(line)}>
                  <Styled.Icon src={editIcon} alt="edit" />
                </IconButton>
                <IconButton onClick={() => deleteLine(line.id)}>
                  <Styled.Icon src={deleteIcon} alt="delete" />
                </IconButton>
              </Styled.ButtonsContainer>
            </Styled.LineItem>
          ))}
        </Styled.LinesContainer>
      </CardLayout>

      <Modal isOpen={isModalOpen} title={modalTitle} onClose={closeModal}>
        <LineModal
          selectedLine={selectedLine}
          stations={stations}
          closeModal={closeModal}
          getLines={getLines}
          selectedColors={selectedColors}
        />
      </Modal>
    </>
  );
};

export default LinePage;
