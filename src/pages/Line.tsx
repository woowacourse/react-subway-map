import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import editImg from 'assets/images/edit.png';
import ModalPortal from 'ModalPortal';
import React from 'react';
import AddLineModal from './AddLineModal';

const Line = () => {
  return (
    <>
      <Container>
        <div className="flex items-center justify-between mb-4 px-2">
          <Title text="🛤️ 지하철 노선 관리" />
          <ImageButton imgUrl={addImg} />
        </div>
        <ListItem title="2호선" editImg={editImg} itemColor="bg-red-400" />
        <ListItem title="신분당선" editImg={editImg} itemColor="bg-blue-400" />
        <ListItem title="리액트선" editImg={editImg} itemColor="bg-gray-400" />
      </Container>
      <ModalPortal>
        <AddLineModal />
      </ModalPortal>
    </>
  );
};

export default Line;
