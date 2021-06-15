import React, { ChangeEventHandler, useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { LABEL_TEXT } from '../../constants/a11y';
import { STATION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import { useFormInput } from '../../hooks/@shared/useFormInput/useFormInput';
import useUpdateEffect from '../../hooks/@shared/useUpdateEffect/useUpdateEffect';
import { RootState } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import Subway from '../@common/Icon/Subway';
import NotificationInput from '../@common/NotificationInput/NotificationInput';

interface Props {
  className?: string;
}

const StationNameInput: VFC<Props> = ({ className }) => {
  const { stations } = useSelector((state: RootState) => state.station);
  const [stationNameInfo, setStationNameInfo] = useFormInput('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeStationInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const stationName = event.currentTarget.value;

    setStationNameInfo({
      data: stationName,
    });
  };

  useUpdateEffect(() => {
    const stationName = stationNameInfo.data;

    setStationNameInfo({
      canSubmit: false,
    });

    if (stationName.length < STATION.NAME_MIN_LENGTH || !isKoreanAndNumber(stationName)) {
      setErrorMessage(ERROR_MESSAGE.INVALID_STATION_NAME);
      return;
    }

    if (stations?.some(({ name }) => name === stationName)) {
      setErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
      return;
    }

    setErrorMessage('');
    setStationNameInfo({
      canSubmit: true,
    });
  }, [stationNameInfo.data]);

  return (
    <NotificationInput
      value={stationNameInfo.data}
      className={className}
      onChange={onChangeStationInput}
      labelIcon={<Subway />}
      minLength={STATION.NAME_MIN_LENGTH}
      maxLength={STATION.NAME_MAX_LENGTH}
      labelText={LABEL_TEXT.PLEASE_INPUT_STATION_NAME}
      messageInfo={{ text: errorMessage, isError: true }}
    />
  );
};

export default StationNameInput;
