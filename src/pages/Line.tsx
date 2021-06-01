import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import MESSAGE from 'constants/message';
// import editImg from 'assets/images/edit.png';
import PATH from 'constants/PATH';
import useData from 'hooks/useData';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLineAsync, AddLinePayload, deleteLineAsync, getLinesAsync } from 'redux/lineSlice';
import { getStationAsync } from 'redux/stationSlice';
import AddLineModal from './AddLineModal';

const Line = () => {
  useRedirect(PATH.LOGIN);
  const dispatch = useDispatch();
  const { stations, lines } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
          <ImageButton imgUrl={addImg} onClick={handleModalOpen} />
        </div>
        {lines?.map((line) => (
          <ListItem
            key={line.id}
            id={line.id}
            itemColor={line.color}
            title={line.name}
            // TODO 수정 기능 구현시 주석 살릴 것.
            // editImg={editImg}
            onDelete={handleDelete}
          />
        ))}
      </Container>
      {modalOpen && <AddLineModal stations={stations} onModalClose={handleModalClose} onSubmit={handleSubmit} />}
    </>
  );
};

export default Line;
