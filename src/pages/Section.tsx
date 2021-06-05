import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Title from '@shared/Title/Title';
import ItemSelector from '@units/ItemSelector/ItemSelector';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import { borderColor } from 'constants/color';
import MESSAGE from 'constants/message';
import PATH from 'constants/PATH';
import useCheckAuth from 'hooks/useCheckAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearSelectedLIne, getLinesAsync, getSelectedLineAsync } from 'redux/lineSlice';
import { addSectionAsync, AddSectionPayload, deleteSectionAsync } from 'redux/sectionSlice';
import { getStationAsync } from 'redux/stationSlice';
import { useAppSelector } from 'redux/store';
import { LineInterface, SelectedLineInterface, StationInterface } from 'types';
import AddSectionModal from './AddSectionModal';

const Section = () => {
  useCheckAuth(PATH.LOGIN);

  const dispatch = useDispatch();

  const stations: StationInterface[] | null = useAppSelector((state) => state.station.stations);
  const lines: LineInterface[] | null = useAppSelector((state) => state.line.lines);
  const selectedLine: SelectedLineInterface | null = useAppSelector((state) => state.line.selectedLine);

  const [selectedLineId, setSelectedLineId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;

    setSelectedLineId(Number(target.value));
  };

  const handleDelete = async (stationId: number, station: string) => {
    if (!window.confirm(MESSAGE.COMMON.DELETE_CONFIRM(station))) {
      return;
    }

    try {
      await dispatch(deleteSectionAsync({ lineId: selectedLineId, stationId }));

      if (selectedLineId) {
        await dispatch(getSelectedLineAsync({ id: selectedLineId }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async ({ id, upStationId, downStationId, distance }: AddSectionPayload) => {
    try {
      await dispatch(addSectionAsync({ id, upStationId, downStationId, distance }));

      if (selectedLineId) {
        await dispatch(getSelectedLineAsync({ id: selectedLineId }));
      }

      alert(MESSAGE.SECTION.ADD_SUCCESS);
      setModalOpen(false);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    dispatch(getStationAsync());
    dispatch(getLinesAsync());
    dispatch(clearSelectedLIne());
  }, []);

  useEffect(() => {
    if (selectedLineId) {
      dispatch(getSelectedLineAsync({ id: selectedLineId }));
    }
  }, [selectedLineId]);

  return (
    <>
      <Container>
        <div className="flex items-center justify-between mb-8">
          <Title text="🔁 지하철 구간 관리" />
          <Button
            onClick={handleModalOpen}
            type="button"
            size="w-10 h-10"
            className="flex justify-center items-center shadow-md rounded-full"
          >
            <img className="opacity-70 w-5" src={addImg} />
          </Button>
        </div>
        <ItemSelector items={lines} defaultOption="조회하실 노선을 선택해주세요." onChange={handleLineChange} />
        {selectedLine && (
          <Container className={`mt-6 w-full ${borderColor[selectedLine.color]}`}>
            <div className={`flex justify-center items-center  rounded-2xl py-1 mb-3 ${selectedLine.color}`}>
              <Title text={selectedLine.name} textSize="text-xl" className="text-center" />
            </div>
            {selectedLine?.stations.map((station) => (
              <ListItem
                onDelete={handleDelete}
                key={station.id}
                id={station.id}
                title={station.name}
                itemColor={selectedLine.color}
              />
            ))}
          </Container>
        )}
      </Container>
      {modalOpen && (
        <AddSectionModal stations={stations} lines={lines} onModalClose={handleModalClose} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Section;
