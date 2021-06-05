import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Loading from 'components/shared/Loading/Loading';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import { API_STATUS, END_POINT } from 'constants/api';
import regex from 'constants/regex';
import { ALERT_MESSAGE, CONFIRM_MESSAGE, NOTIFICATION } from 'constants/messages';
import ROUTE from 'constants/routes';
import useFetch from 'hooks/useFetch';
import Styled from './styles';
import useNotify from 'hooks/useNotify';

const StationPage = () => {
  const user = useAppSelector<User | undefined>((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [stations, setStations] = useState<Station[]>([]);
  const [newStationName, setNewStationName] = useState('');
  const [editingStationId, setEditingStationId] = useState(0);
  const [editingStationName, setEditingStationName] = useState('');
  const { NotiMessage, showNotiMessage } = useNotify();

  const [getStationsAsync, getStationsLoading] = useFetch();
  const [addStationAsync, addStationLoading] = useFetch('POST');
  const [deleteStationAsync, deleteStationLoading] = useFetch('DELETE');
  const [editStationAsync, editStationLoading] = useFetch('PUT');

  const inputRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const isValidStationName = (stationName: string) => regex.koreanAndNumber.test(stationName);

  const fetchStations = async () => {
    const res = await getStationsAsync(END_POINT.STATIONS);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setStations(res.data.reverse());
    }
  };

  const addStation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName(newStationName)) {
      showNotiMessage({ message: NOTIFICATION.STATION_NAME, valid: false, visible: true });

      return;
    }

    showNotiMessage({ visible: false });

    const res = await addStationAsync(END_POINT.STATIONS, {
      name: newStationName,
    });

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      setNewStationName('');
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_ADD_STAION);

      await fetchStations();
    }
  };

  const editStation = (station: { id: number; name: string }) => {
    setEditingStationId(station.id);
    setEditingStationName(station.name);
  };

  const saveEditForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName(editingStationName)) {
      showNotiMessage({ message: NOTIFICATION.STATION_NAME, valid: false, visible: true });

      return;
    }

    showNotiMessage({ visible: false });

    const res = await editStationAsync(`${END_POINT.STATIONS}/${editingStationId}`, {
      name: editingStationName,
    });

    console.log('real save!!!', res); // ㅜㅜ

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      await fetchStations();
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_EDIT_STATION);
    }

    setEditingStationId(0);
    setEditingStationName('');
  };

  const deleteStation = async (id: Station['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    const res = await deleteStationAsync(`${END_POINT.STATIONS}/${id}`);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      await fetchStations();
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_DELETE_STAION);
    }
  };

  const isLoading =
    getStationsLoading || addStationLoading || deleteStationLoading || editStationLoading;

  // TOOD: 첫 번째 클릭에는 focus 실패
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <CardLayout title={'지하철 역 관리'}>
      <Loading isLoading={isLoading} />
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
            <NotiMessage />
          </Styled.InputWrapper>
          <TextButton text="추가" styleType={ButtonType.YELLOW} />
        </Styled.InputContainer>
      </form>

      <Styled.StationsContainer data-testid="station-list">
        {stations?.map((station) => (
          <Styled.StationItem key={station.id} data-testid="station-item">
            {station.id === editingStationId ? (
              <Styled.EditingStationForm onSubmit={saveEditForm}>
                <Styled.EditingStationInput
                  ref={inputRef}
                  value={editingStationName}
                  onChange={(e) => setEditingStationName(e.target.value)}
                  minLength={2}
                  maxLength={20}
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
