import React, { ChangeEventHandler, FC, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import HorizontalLine from '../../components/@common/HorizontalLine/HorizontalLine';
import Subway from '../../components/@common/Icon/Subway';
import ListItem from '../../components/@common/ListItem/ListItem';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, STATION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useUpdateEffect from '../../hooks/useUpdateEffect/useUpdateEffect';
import { addStation, deleteStation, loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import { StationForm, StationList, StationName, StationNameInput } from './Stations.styles';

const Stations: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { stations, errorMessage } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  const [stationInput, setStationInput] = useState('');
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const isValidStationInput = stationInput !== '' && validationErrorMessage === '';

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

  const onChangeStationInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (value.length >= 2 && isKoreanAndNumber(value)) {
      setValidationErrorMessage('');
    } else {
      setValidationErrorMessage(ERROR_MESSAGE.INVALID_STATION_NAME);
    }

    if (stations?.some(({ name }) => name === value)) {
      setValidationErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
    }

    setStationInput(value);
  };

  const onAddStation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addStation(stationInput));
    setStationInput('');
  };

  const onDeleteStation = (stationId: number) => () => {
    dispatch(deleteStation(stationId));
  };

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
              message={{ text: validationErrorMessage, isError: true }}
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
