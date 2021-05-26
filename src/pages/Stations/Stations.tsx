import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import HorizontalLine from '../../components/@common/HorizontalLine/HorizontalLine';
import Subway from '../../components/@common/Icon/Subway';
import ListItem from '../../components/@common/ListItem/ListItem';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, STATION, THEME_COLOR } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import { addStation, deleteStation, loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import { StationForm, StationList, StationNameInput } from './Stations.styles';

const Stations: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { stations } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  // TODO: form state로 하나로 묶기
  const [stationInput, setStationInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isValidStationInput = stationInput !== '' && errorMessage === '';

  useEffect(() => {
    if (stations === null) {
      dispatch(loadStations(API_INFO[apiOwner].endPoint));
    }
  }, []);

  const onChangeStationInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length >= 2 && isKoreanAndNumber(value)) {
      setErrorMessage('');
    } else {
      setErrorMessage(ERROR_MESSAGE.INVALID_STATION_NAME);
    }

    if (stations?.some(({ name }) => name === value)) {
      setErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
    }

    setStationInput(value);
  };

  const onAddStation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addStation({ baseURL: API_INFO[apiOwner].endPoint, stationName: stationInput }));
    setStationInput('');
  };

  const onDeleteStation = (stationId: number) => () => {
    dispatch(deleteStation({ baseURL: API_INFO[apiOwner].endPoint, stationId }));
  };

  return (
    <CardTemplate templateColor={THEME_COLOR[400]} titleText={PAGE_INFO.STATIONS.text}>
      <StationForm onSubmit={onAddStation}>
        <StationNameInput
          value={stationInput}
          onChange={onChangeStationInput}
          labelIcon={<Subway />}
          minLength={STATION.NAME_MIN_LENGTH}
          maxLength={STATION.NAME_MAX_LENGTH}
          labelText={STATION.NAME_LABEL_TEXT}
          message={{ text: errorMessage, isError: true }}
        />
        <Button disabled={!isValidStationInput}>추가</Button>
      </StationForm>
      <HorizontalLine />
      {stations && (
        <StationList>
          {stations.map((station) => (
            <ListItem key={station.id} onDelete={onDeleteStation(station.id)}>
              {station.name}
            </ListItem>
          ))}
        </StationList>
      )}
    </CardTemplate>
  );
};

export default Stations;
