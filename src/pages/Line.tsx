import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import MESSAGE from 'constants/message';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLineAsync, AddLinePayload, deleteLineAsync, getLinesAsync } from 'redux/lineSlice';
import { getStationAsync } from 'redux/stationSlice';
import { useData, useModal } from '../hooks';
import AddLineModal from './AddLineModal';

const Line = () => {
  const dispatch = useDispatch();
  const { stations, lines } = useData();
  const { modalOpen, onModalOpen, onModalClose } = useModal();

  const handleDelete = async (id: number, line: string) => {
    if (!window.confirm(MESSAGE.COMMON.DELETE_CONFIRM(line))) {
      return;
    }

    try {
      await dispatch(deleteLineAsync({ id }));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async ({ name, color, upStationId, downStationId, distance }: AddLinePayload) => {
    try {
      await dispatch(addLineAsync({ name, color, upStationId, downStationId, distance }));

      alert(MESSAGE.LINE.ADD_SUCCESS);
      onModalClose();
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
          <ImageButton imgUrl={addImg} onClick={onModalOpen} />
        </div>
        {lines?.map((line) => (
          <ListItem key={line.id} id={line.id} itemColor={line.color} title={line.name} onDelete={handleDelete} />
        ))}
      </Container>
      {modalOpen && <AddLineModal stations={stations} onModalClose={onModalClose} onSubmit={handleSubmit} />}
    </>
  );
};

export default Line;
