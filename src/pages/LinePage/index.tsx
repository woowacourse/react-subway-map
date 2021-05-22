import React, { useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Modal from 'components/shared/Modal/Modal';
import LineModal from 'components/LineModal/LineModal';
import { ButtonType } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import Styled from './styles';

const lines = [
  { name: '1호선', color: '#9ca3af' },
  { name: '2호선', color: '#f87171' },
  { name: '3호선', color: '#fbbf24' },
  { name: '5호선', color: '#f6ad54' },
  { name: '9호선', color: '#34d399' },
  { name: '신분당선', color: '#60a5fa' },
  { name: '4호선', color: '#27c6da' },
  { name: '6호선', color: '#818cf8' },
  { name: '7호선', color: '#a78bfa' },
  { name: '8호선', color: '#f472b6' },
];

const stations = [
  '사당',
  '방배',
  '서초',
  '교대',
  '강남',
  '잠실',
  '잠실새내',
  '종합운동장',
  '고속터미널',
  '경찰병원',
  '가락시장',
  '오금',
  '흑석',
  '동작',
];

const LinePage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <CardLayout title={'노선 관리'}>
        <Styled.AddButtonWrapper>
          <TextButton
            text="노선 추가"
            styleType={ButtonType.FILLED}
            onClick={() => setModalOpen(true)}
          />
        </Styled.AddButtonWrapper>
        <Styled.LinesContainer>
          {lines.map(({ name, color }) => (
            <Styled.LineItem key={name}>
              <Styled.Color color={color}></Styled.Color>
              {name}
              <Styled.ButtonsContainer>
                <IconButton>
                  <Styled.Icon src={editIcon} alt="edit" />
                </IconButton>
                <IconButton>
                  <Styled.Icon src={deleteIcon} alt="delete" />
                </IconButton>
              </Styled.ButtonsContainer>
            </Styled.LineItem>
          ))}
        </Styled.LinesContainer>
      </CardLayout>

      <Modal isOpen={isModalOpen} title="노선 생성" onClose={closeModal}>
        <LineModal stations={stations} />
      </Modal>
    </>
  );
};

export default LinePage;
