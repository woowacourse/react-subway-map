import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import COLORS from 'constants/color';
import MESSAGE from 'constants/message';
import PATH from 'constants/path';
import useChangeEvent from 'hooks/useChangeEvent';
import useData from 'hooks/useData';
import useModal from 'hooks/useModal';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSelectedLIne, getLinesAsync, getSelectedLineAsync } from 'redux/lineSlice';
import { addSectionAsync, AddSectionPayload, deleteSectionAsync } from 'redux/sectionSlice';
import { getStationAsync } from 'redux/stationSlice';
import AddSectionModal from './AddSectionModal';

const Section = () => {
  useRedirect(PATH.LOGIN);
  const dispatch = useDispatch();
  const { stations, lines, selectedLine } = useData();
  const { modalOpen, onModalOpen, onModalClose } = useModal();

  const { value: selectedLineId, onChange: onSelectedLineIdChange } = useChangeEvent(0);

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
      onModalClose();
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
          <ImageButton imgUrl={addImg} onClick={onModalOpen} />
        </div>

        <SelectInput
          className="w-full"
          data={lines}
          defaultSelect="노선을 선택해주세요"
          defaultValue="DEFAULT"
          title="조회하실 노선을 선택해주세요."
          onChange={onSelectedLineIdChange}
        />
        {selectedLine && (
          <Container className={`mt-6 w-full ${COLORS[selectedLine.color].borderColor}`}>
            <div className={`flex justify-center items-center  rounded-2xl py-1 mb-3 ${selectedLine.color}`}>
              <Title className="text-center" text={selectedLine.name} textSize="text-xl" />
            </div>
            {selectedLine?.stations.map((station) => (
              <ListItem
                key={station.id}
                id={station.id}
                itemColor={selectedLine.color}
                title={station.name}
                onDelete={handleDelete}
              />
            ))}
          </Container>
        )}
      </Container>
      {modalOpen && (
        <AddSectionModal lines={lines} stations={stations} onModalClose={onModalClose} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Section;
