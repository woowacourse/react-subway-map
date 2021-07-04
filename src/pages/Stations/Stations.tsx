import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Dimmed from '../../components/@common/Dimmed/Dimmed';
import HorizontalLine from '../../components/@common/HorizontalLine/HorizontalLine';
import Subway from '../../components/@common/Icon/Subway';
import Loading from '../../components/@common/Loading/Loading';
import ListItem from '../../components/@shared/ListItem/ListItem';
import { PAGE_INFO, STATION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useThemeColor from '../../hooks/useThemeColor';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { addStation, deleteStation, loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import { StationForm, StationList, StationName, StationNameInput } from './Stations.styles';

const Stations = (): JSX.Element => {
  const themeColor = useThemeColor();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { stations, isLoading, errorMessage } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  const [formInput, setFormInput] = useState('');
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const isValidStationInput = formInput !== '' && validationErrorMessage === '';

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

  const onChangeStationInput: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    if (value.length >= 2 && isKoreanAndNumber(value)) {
      setValidationErrorMessage('');
    } else {
      setValidationErrorMessage(ERROR_MESSAGE.INVALID_STATION_NAME);
    }

    if (stations?.some(({ name }) => name === value)) {
      setValidationErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
    }

    setFormInput(value);
  };

  const onAddStation: FormEventHandler = (event) => {
    event.preventDefault();

    dispatch(addStation(formInput));
    setFormInput('');
  };

  const onDeleteStation = (stationId: number) => () => {
    dispatch(deleteStation(stationId));
  };

  return (
    <CardTemplate templateColor={themeColor[400]} titleText={PAGE_INFO.STATIONS.text}>
      {isLoading && (
        <Dimmed backgroundColor="rgba(255, 255, 255, 0.2)">
          <Loading />
        </Dimmed>
      )}
      {isLogin && (
        <>
          <StationForm onSubmit={onAddStation}>
            <StationNameInput
              value={formInput}
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
