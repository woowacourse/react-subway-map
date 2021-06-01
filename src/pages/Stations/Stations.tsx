import React, { FC, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import HorizontalLine from '../../components/@common/HorizontalLine/HorizontalLine';
import Subway from '../../components/@common/Icon/Subway';
import ListItem from '../../components/@common/ListItem/ListItem';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, STATION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useNotificationInput from '../../hooks/@shared/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/@shared/useReadyToSubmit/useReadyToSubmit';
import useUpdateEffect from '../../hooks/@shared/useUpdateEffect/useUpdateEffect';
import { addStation, deleteStation, loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import { StationForm, StationList, StationName, StationNameInput } from './Stations.styles';
import { CONFIRM_MESSAGE } from '../../constants/message';

const Stations: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { stations, errorMessage } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  const [
    stationInput,
    stationErrorMessage,
    onChangeStationInput,
    setStationInput,
  ] = useNotificationInput(({ setInput, setErrorMessage, targetValue }) => {
    if (targetValue.length >= 2 && isKoreanAndNumber(targetValue)) {
      setErrorMessage('');
    } else {
      setErrorMessage(ERROR_MESSAGE.INVALID_STATION_NAME);
    }

    if (stations?.some(({ name }) => name === targetValue)) {
      setErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
    }

    setInput(targetValue);
  });

  const isValidStationInput = useReadyToSubmit([stationInput], [stationErrorMessage]);

  const onAddStation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addStation(stationInput));
    setStationInput('');
  };

  const onDeleteStation = (stationId: number) => () => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_STATION)) {
      return;
    }

    dispatch(deleteStation(stationId));
  };

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(loadStations());
    }
  }, []);

  useUpdateEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  }, [errorMessage]);

  return (
    <CardTemplate
      templateColor={API_INFO[apiOwner].themeColor[400]}
      titleText={PAGE_INFO.STATIONS.text}
    >
      {isLogin && (
        <>
          <StationForm onSubmit={onAddStation}>
            <StationNameInput
              value={stationInput}
              onChange={onChangeStationInput}
              labelIcon={<Subway />}
              minLength={STATION.NAME_MIN_LENGTH}
              maxLength={STATION.NAME_MAX_LENGTH}
              labelText={STATION.NAME_LABEL_TEXT}
              message={{ text: stationErrorMessage, isError: true }}
            />
            <Button disabled={!isValidStationInput}>추가</Button>
          </StationForm>
          <HorizontalLine />
        </>
      )}

      {stations && (
        <StationList>
          {stations.map((station) => (
            <ListItem key={station.id} onDelete={onDeleteStation(station.id)}>
              <Subway />
              <StationName>{station.name}</StationName>
            </ListItem>
          ))}
        </StationList>
      )}
    </CardTemplate>
  );
};

export default Stations;
