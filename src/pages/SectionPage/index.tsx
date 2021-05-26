import React, { useEffect, useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import IconButton from 'components/shared/IconButton/IconButton';
import Modal from 'components/shared/Modal/Modal';
import SectionModal from 'components/SectionModal/SectionModal';
import deleteIcon from 'assets/delete.png';
import useFetch from 'hooks/useFetch';
import { API_STATUS, END_POINT } from 'constants/api';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from 'constants/messages';
import { Line, Station } from 'types';
import Styled from './styles';

const SectionPage = () => {
  const { response: lines = [], fetchData: getLinesAsync } = useFetch<Line[]>();
  const { response: stations, fetchData: getStationsAsync } = useFetch<Station[]>();
  const { response: line, fetchData: getLineAsync } = useFetch<Line>();
  const { fetchData: deleteStationAsync } = useFetch<null>();

  const [targetLine, setTargetLine] = useState<Line | undefined>(line);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const lineOptions = lines.map((line) => ({ id: line.id, value: line.name }));

  const getStations = async () => {
    const res = await getStationsAsync('GET', END_POINT.STATIONS);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    }
  };

  const getLines = async () => {
    const res = await getLinesAsync('GET', END_POINT.LINES);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_LINES);
    }
  };

  const getLine = async (lineId?: Line['id']) => {
    const res = await getLineAsync('GET', `${END_POINT.LINES}/${lineId || targetLine?.id}`);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    }
  };

  const deleteStation = async (stationId: Station['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    const res = await deleteStationAsync(
      'DELETE',
      `${END_POINT.LINES}/${targetLine?.id}/sections?stationId=${stationId}`,
    );

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_DELETE_SECTION);
    } else if (res.status === API_STATUS.FULFILLED) {
      // await getLineAsync('GET', `${END_POINT.LINES}/${targetLine?.id}`);
      await getLine();

      // TODO: 요청 실패 시 에러 핸들링
    }
  };

  const selectTargetLine = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetLineId = Number(event.target.value);

    await getLine(targetLineId);
    setTargetLine(line);
  };

  const openSectionModal = async () => {
    setModalOpen(true);
    await getStations();
  };

  // TODO: lines 상태 관리
  const closeModal = async () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchLines = async () => {
      getLines();
    };

    fetchLines();
  }, []);

  useEffect(() => {
    // TODO: 변경된 line response의 유효성 검사
    setTargetLine(line);
  }, [line]);

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
