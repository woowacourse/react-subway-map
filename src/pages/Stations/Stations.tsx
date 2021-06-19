import React, { useEffect, VFC } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import { SubmitFormInfoHandler } from '../../components/@common/Form/Form';
import ResponsiveFormSubmit from '../../components/@common/Form/ResponsiveFormSubmit/ResponsiveFormSubmit';
import HorizontalLine from '../../components/@common/HorizontalLine/HorizontalLine';
import Subway from '../../components/@common/Icon/Subway';
import ListItem from '../../components/@common/ListItem/ListItem';
import StationNameInput from '../../components/StationNameInput/StationNameInput';
import { LABEL_TEXT } from '../../constants/a11y';
import { PAGE_INFO } from '../../constants/appInfo';
import { CONFIRM_MESSAGE } from '../../constants/message';
import useCurrentAPIInfo from '../../hooks/@shared/useCurrentAPIInfo/useCurrentAPIInfo';
import useUpdateEffect from '../../hooks/@shared/useUpdateEffect/useUpdateEffect';
import { addStation, deleteStation, loadStations } from '../../redux/slice/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { StationForm, StationList, StationName } from './Stations.styles';

const Stations: VFC = () => {
  const APIInfo = useCurrentAPIInfo();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { stations, errorMessage } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  const onSubmitAddStation: SubmitFormInfoHandler = (inputValues, clearFormInput) => {
    const [stationName] = inputValues;

    dispatch(addStation(String(stationName)));
    clearFormInput();
  };

  const onDeleteStation = (stationId: number) => () => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_STATION)) {
      return;
    }

    dispatch(deleteStation(stationId));
  };

  useEffect(() => {
    dispatch(loadStations());
  }, []);

  useUpdateEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  }, [errorMessage]);

  return (
    <CardTemplate templateColor={APIInfo.themeColor} titleText={PAGE_INFO.STATIONS.text}>
      {isLogin && (
        <>
          <StationForm onSubmitFormInfo={onSubmitAddStation}>
            <StationNameInput className="station-name-input" />
            <ResponsiveFormSubmit>{LABEL_TEXT.ADD}</ResponsiveFormSubmit>
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
