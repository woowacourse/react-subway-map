import React, { useEffect, useRef, useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import { ButtonType } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import Styled from './styles';

const stations = [
  {
    id: 1,
    name: '방배',
  },
  {
    id: 2,
    name: '사당',
  },
  {
    id: 3,
    name: '서초',
  },
  {
    id: 4,
    name: '교대',
  },
  {
    id: 5,
    name: '강남',
  },
];

const StationPage = () => {
  const [editingStationId, setEditingStationId] = useState<number>(0);
  const [editingStationName, setEditingStationName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const editStation = (station: { id: number; name: string }) => {
    setEditingStationId(station.id);
    setEditingStationName(station.name);
  };
  const saveEditForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: 비동기 통신 진행

    setEditingStationId(0);
    setEditingStationName('');
  };

  // TOOD: 첫 번째 클릭에는 focus 실패
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

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
          <Styled.StationItem key={station.id}>
            {station.id === editingStationId ? (
              <Styled.EditingStationForm onSubmit={saveEditForm}>
                <Styled.EditingStationInput
                  ref={inputRef}
                  value={editingStationName}
                  onChange={(e) => setEditingStationName(e.target.value)}
                ></Styled.EditingStationInput>
                <IconButton type="submit">
                  <Styled.Icon src={saveIcon} alt="save" />
                </IconButton>
              </Styled.EditingStationForm>
            ) : (
              <>
                {station.name}
                <Styled.ButtonsContainer>
                  <IconButton>
                    <Styled.Icon src={editIcon} alt="edit" onClick={() => editStation(station)} />
                  </IconButton>
                  <IconButton>
                    <Styled.Icon src={deleteIcon} alt="delete" />
                  </IconButton>
                </Styled.ButtonsContainer>
              </>
            )}
          </Styled.StationItem>
        ))}
      </Styled.StationsContainer>
    </CardLayout>
  );
};

export default StationPage;
