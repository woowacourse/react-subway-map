import React, { useEffect, useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import IconButton from 'components/shared/IconButton/IconButton';
import Modal from 'components/shared/Modal/Modal';
import SectionModal from 'components/SectionModal/SectionModal';
import deleteIcon from 'assets/delete.png';
import { API_STATUS } from 'constants/api';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from 'constants/messages';
import { requestGetStations } from 'request/station';
import { requestDeleteSection, requestGetLine, requestGetLines } from 'request/line';
import { Line, Station } from 'types';
import Styled from './styles';

const SectionPage = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [targetLine, setTargetLine] = useState<Line | undefined>();
  const [stations, setStations] = useState<Station[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const lineOptions = lines.map((line) => ({ id: line.id, value: line.name }));

  const getStations = async () => {
    const res = await requestGetStations();

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setStations(res.data);
    }
  };

  const getLines = async () => {
    const res = await requestGetLines();

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_LINES);
    } else if (res.status === API_STATUS.FULFILLED) {
      setLines(res.data);
    }
  };

  const getLine = async (targetLineId: Line['id']) => {
    const res = await requestGetLine(targetLineId);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setTargetLine(res.data);
    }
  };

  const selectTargetLine = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetLineId = Number(event.target.value);

    await getLine(targetLineId);
  };

  const deleteStation = async (stationId: Station['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;
    if (!targetLine) return;

    const res = await requestDeleteSection(targetLine?.id, stationId);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_DELETE_SECTION);
    } else if (res.status === API_STATUS.FULFILLED) {
      await getLine(targetLine.id);
    }
  };

  const openSectionModal = async () => {
    setModalOpen(true);
    await getStations();
  };

  const closeModal = async () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchLines = async () => {
      getLines();
    };

    fetchLines();
  }, []);

  return (
    <>
      <CardLayout title="구간 관리">
        <Styled.TopContaier>
          <Styled.DropdownWrapper>
            <Dropdown
              labelText="노선 선택"
              defaultOption="노선 선택"
              options={lineOptions}
              onSelect={selectTargetLine}
            />
          </Styled.DropdownWrapper>
          <Styled.AddButtonWrapper>
            <Styled.AddButton onClick={openSectionModal}>+</Styled.AddButton>
          </Styled.AddButtonWrapper>
        </Styled.TopContaier>
        {targetLine && (
          <Styled.LineDetail>
            <Styled.LineName color={targetLine.color}>{targetLine.name}</Styled.LineName>
            <Styled.SectionsContainer>
              {targetLine.stations.map((station) => (
                <Styled.SectionItem key={station.id}>
                  {station.name}
                  <IconButton onClick={() => deleteStation(station.id)}>
                    <Styled.Icon src={deleteIcon} alt="delete" />
                  </IconButton>
                </Styled.SectionItem>
              ))}
            </Styled.SectionsContainer>
          </Styled.LineDetail>
        )}
      </CardLayout>
      <Modal isOpen={isModalOpen} title="구간 추가" onClose={closeModal}>
        <SectionModal
          targetLine={targetLine}
          selectTargetLine={selectTargetLine}
          lines={lines}
          stations={stations}
          closeModal={closeModal}
          getLine={getLine}
        />
      </Modal>
    </>
  );
};

export default SectionPage;
