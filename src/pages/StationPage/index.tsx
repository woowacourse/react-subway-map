import React from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import { ButtonType } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import Styled from './styles';

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

const StationPage = () => {
  return (
    <CardLayout title={'지하철 역 관리'}>
      <Styled.InputContainer>
        <Styled.InputWrapper>
          <Input type="text" labelText="지하철 역 이름을 입력해주세요." />
        </Styled.InputWrapper>
        <TextButton text="추가" styleType={ButtonType.FILLED} />
      </Styled.InputContainer>

      <Styled.StationsContainer>
        {stations.map((station) => (
          <Styled.StationItem key={station}>
            {station}
            <Styled.ButtonsContainer>
              <IconButton>
                <Styled.Icon src={editIcon} alt="edit" />
              </IconButton>
              <IconButton>
                <Styled.Icon src={deleteIcon} alt="delete" />
              </IconButton>
            </Styled.ButtonsContainer>
          </Styled.StationItem>
        ))}
      </Styled.StationsContainer>
    </CardLayout>
  );
};

export default StationPage;
