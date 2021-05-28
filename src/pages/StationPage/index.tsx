import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Notification from 'components/shared/Notification/Notification';
import Loading from 'components/shared/Loading/Loading';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import { API_STATUS, END_POINT } from 'constants/api';
import regex from 'constants/regex';
import { ALERT_MESSAGE, CONFIRM_MESSAGE, NOTIFICATION } from 'constants/messages';
import useFetch from 'hooks/useFetch';
import Styled from './styles';
import ROUTE from 'constants/routes';

const StationPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [stations, setStations] = useState<Station[]>([]);
  const [newStationName, setNewStationName] = useState('');
  const [editingStationId, setEditingStationId] = useState<number>(0);
  const [editingStationName, setEditingStationName] = useState<string>('');
  const [isMessageValid, setMessageValid] = useState<boolean>(false);
  const [isMessageVisible, setMessageVisible] = useState<boolean>(false);

  const { fetchData: getStationsAsync, loading: getStationsLoading } = useFetch('GET');
  const { fetchData: addStationAsync, loading: addStationLoading } = useFetch('POST');
  const { fetchData: deleteStationAsync, loading: deleteStationLoading } = useFetch('DELETE');
  const { fetchData: editStationAsync, loading: editStationLoading } = useFetch('PUT');

  const inputRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const isValidStationName = (stationName: string) => regex.koreanAndNumber.test(stationName);

  const getStations = async () => {
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
      setMessageValid(false);
      setMessageVisible(true);

      return;
    }

    setMessageVisible(false);

    const res = await addStationAsync(END_POINT.STATIONS, {
      name: newStationName,
    });

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      setNewStationName('');
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_ADD_STAION);

      await getStations();
    }
  };

  const editStation = (station: { id: number; name: string }) => {
    setEditingStationId(station.id);
    setEditingStationName(station.name);
  };

  const saveEditForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName(editingStationName)) {
      setMessageValid(false);
      setMessageVisible(true);

      return;
    }

    setMessageVisible(false);

    const res = await editStationAsync(`${END_POINT.STATIONS}/${editingStationId}`, {
      name: editingStationName,
    });

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      await getStations();
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
      await getStations();
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
    const fetchStations = async () => {
      await getStations();
    };

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
            <Notification
              isValid={isMessageValid}
              isVisible={isMessageVisible}
              message={NOTIFICATION.STATION_NAME}
            />
          </Styled.InputWrapper>
          <TextButton text="추가" styleType={ButtonType.YELLOW} />
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
