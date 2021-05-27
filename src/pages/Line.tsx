import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
// import editImg from 'assets/images/edit.png';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { addLineAsync, AddLinePayload, deleteLineAsync, getLinesAsync } from 'redux/lineSlice';
import { getStationAsync } from 'redux/stationSlice';
import { RootState } from 'redux/store';
import { LineInterface, StationInterface } from 'types';
import AddLineModal from './AddLineModal';

const Line = () => {
  useRedirect(PATH.LOGIN);

  const dispatch = useDispatch();

  // TODO useAppSelector 추상화 하기
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const stations: StationInterface[] | null = useAppSelector((state) => state.station.stations);
  const lines: LineInterface[] | null = useAppSelector((state) => state.line.lines);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteLineAsync({ id }));

      alert('선택하신 노선을 삭제했습니다.');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async ({ name, color, upStationId, downStationId, distance }: AddLinePayload) => {
    try {
      await dispatch(addLineAsync({ name, color, upStationId, downStationId, distance }));

      alert('노선 추가에 성공하셨습니다.');
      setModalOpen(false);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    dispatch(getLinesAsync());
    dispatch(getStationAsync());
  }, [dispatch]);

  return (
    <>
      <Container className="">
        <div className="flex items-center justify-between mb-4 px-2">
          <Title text="🛤️ 지하철 노선 관리" />
          <ImageButton onClick={handleModalOpen} imgUrl={addImg} />
        </div>
        {lines?.map((line) => (
          <ListItem
            onDelete={handleDelete}
            key={line.id}
            id={line.id}
            title={line.name}
            // TODO 수정 기능 구현시 주석 살릴 것.
            // editImg={editImg}
            itemColor={line.color}
          />
        ))}
      </Container>
      {modalOpen && <AddLineModal stations={stations} onModalClose={handleModalClose} onSubmit={handleSubmit} />}
    </>
  );
};

export default Line;
