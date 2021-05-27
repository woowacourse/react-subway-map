import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Notification from 'components/shared/Notification/Notification';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import { API_STATUS } from 'constants/api';
import regex from 'constants/regex';
import { ALERT_MESSAGE, CONFIRM_MESSAGE, NOTIFICATION } from 'constants/messages';
import {
  requestAddStation,
  requestDeleteStation,
  requestEditStation,
  requestGetStations,
} from 'request/station';
import Styled from './styles';
import ROUTE from 'constants/routes';

const StationPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [stations, setStations] = useState<Station[]>([]);
  const [newStationName, setNewStationName] = useState('');
  const [editingStationId, setEditingStationId] = useState<number>(0);
  const [editingStationName, setEditingStationName] = useState<string>('');
  const [isMessageValid, setMessageValid] = useState<boolean>(false);
  const [isMessageVisible, setMessageVisible] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const isValidStationName = regex.koreanAndNumber.test(newStationName);

  const getStations = async () => {
    if (!BASE_URL) return;

    const res = await requestGetStations(BASE_URL);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setStations(res.data);
    }
  };

  const addStation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName) {
      setMessageValid(false);
      setMessageVisible(true);

      return;
    }

    setMessageVisible(false);
    if (!BASE_URL) return;

    const res = await requestAddStation(BASE_URL, newStationName);

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

    if (!BASE_URL) return;

    const res = await requestEditStation(BASE_URL, editingStationName, editingStationId);

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
    if (!BASE_URL) return;

    const res = await requestDeleteStation(BASE_URL, id);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      await getStations();
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_DELETE_STAION);
    }
  };

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
