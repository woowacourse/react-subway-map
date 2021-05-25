import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import editImg from 'assets/images/edit.png';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';
import ModalPortal from 'ModalPortal';
import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getLineAsync } from 'redux/lineSlice';
import { RootState } from 'redux/store';
import { LineInterface } from 'types';
import AddLineModal from './AddLineModal';

const Line = () => {
  useRedirect(PATH.LOGIN);

  const dispatch = useDispatch();

  // TODO useAppSelector 추상화 하기
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const lines: LineInterface[] | null = useAppSelector((state) => state.line.lines);

  const handleDelete = () => {
    console.log('delete');
  };

  useEffect(() => {
    dispatch(getLineAsync());
  }, [dispatch]);

  return (
    <>
      <Container>
        <div className="flex items-center justify-between mb-4 px-2">
          <Title text="🛤️ 지하철 노선 관리" />
          <ImageButton imgUrl={addImg} />
        </div>
        {lines?.map((line) => (
          <ListItem
            onDelete={handleDelete}
            key={line.id}
            id={line.id}
            title={line.name}
            editImg={editImg}
            itemColor="bg-red-400"
          />
        ))}
      </Container>
      <ModalPortal>
        <AddLineModal />
      </ModalPortal>
    </>
  );
};

export default Line;
