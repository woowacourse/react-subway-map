import React, { useEffect, useRef, useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Notification from 'components/shared/Notification/Notification';
import { ButtonType, Station } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import { END_POINT, API_STATUS } from 'constants/api';
import regex from 'constants/regex';
import { ALERT_MESSAGE, CONFIRM_MESSAGE, NOTIFICATION } from 'constants/messages';
import useFetch from 'hooks/useFetch';
import Styled from './styles';

const StationPage = () => {
  const { response: stations, fetchData: getStationsAsync } = useFetch<Station[]>();
  const { fetchData: addStationAsync } = useFetch<Station>();
  const { fetchData: deleteStationAsync } = useFetch<Station>();

  const [newStationName, setNewStationName] = useState('');
  const [editingStationId, setEditingStationId] = useState<number>(0);
  const [editingStationName, setEditingStationName] = useState<string>('');
  const [isMessageValid, setMessageValid] = useState<boolean>(false);
  const [isMessageVisible, setMessageVisible] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isValidStationName = regex.koreanAndNumber.test(newStationName);

  const addStation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName) {
      setMessageValid(false);
      setMessageVisible(true);

      return;
    }

    setMessageVisible(false);
    const res = await addStationAsync('POST', END_POINT.STATIONS, { name: newStationName });

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_ADD_STATION);
    } else if (res.status === API_STATUS.FULFILLED) {
      getStationsAsync('GET', END_POINT.STATIONS);
      setNewStationName('');
    }
  };

  const editStation = (station: { id: number; name: string }) => {
    setEditingStationId(station.id);
    setEditingStationName(station.name);
  };

  const saveEditForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: update 비동기 통신 진행

    setEditingStationId(0);
    setEditingStationName('');
  };

  const deleteStation = async (id: Station['id']) => {
    const res = await deleteStationAsync('DELETE', `${END_POINT.STATIONS}/${id}`);

    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_DELETE_STATION);
    } else if (res.status === API_STATUS.FULFILLED) {
      getStationsAsync('GET', END_POINT.STATIONS);
    }
  };

  // TOOD: 첫 번째 클릭에는 focus 실패
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  useEffect(() => {
    const fetchStations = async () => {
      const res = await getStationsAsync('GET', END_POINT.STATIONS);

      if (res.status === API_STATUS.REJECTED) {
        alert(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
      }
    };

    fetchStations();
  }, []);

  return (
    <CardLayout title={'지하철 역 관리'}>
      <form onSubmit={addStation}>
        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Input
              type="text"
              labelText="지하철 역 이름을 입력해주세요."
              value={newStationName}
              onChange={(event) => setNewStationName(event.target.value)}
              extraArgs={{ minLength: 2, maxLength: 20 }}
            />
            <Notification
              isValid={isMessageValid}
              isVisible={isMessageVisible}
              message={NOTIFICATION.STATION_NAME}
            />
          </Styled.InputWrapper>
          <TextButton text="추가" styleType={ButtonType.FILLED} />
        </Styled.InputContainer>
      </form>

      <Styled.StationsContainer>
        {stations?.map((station) => (
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
                  <IconButton onClick={() => editStation(station)}>
                    <Styled.Icon src={editIcon} alt="edit" />
                  </IconButton>
                  <IconButton onClick={() => deleteStation(station.id)}>
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
