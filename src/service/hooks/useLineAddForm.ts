import { useState } from 'react';
import { LineColor, LineForm, StationId } from '../../types';
import useStation from './useStation';
import { INVALID_VALUE, REGEX } from '../../constants/validate';
import { lineColors, SERVICE } from '../../constants/service';

const useLineAddForm = () => {
  const [form, setForm] = useState<LineForm>({
    name: '',
    color: lineColors[0],
    upStationId: INVALID_VALUE,
    downStationId: INVALID_VALUE,
    distance: SERVICE.MIN_DISTANCE,
  });
  const { stations } = useStation();

  const isValidName = REGEX.LINE_NAME.test(form.name);
  const isValidColor = lineColors.includes(form.color as LineColor);
  const isValidDistance = form.distance >= SERVICE.MIN_DISTANCE;
  const isSelectedUpStation = form.upStationId !== INVALID_VALUE;
  const isSelectedDownStation = form.downStationId !== INVALID_VALUE;
  const isValidForm =
    isValidName &&
    isValidColor &&
    isValidDistance &&
    isSelectedUpStation &&
    isSelectedDownStation;

  const availableDownStations = stations.isSuccess
    ? stations.data.filter((station) => station.id !== form.upStationId)
    : [];

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const setColor = (color: LineColor) => {
    setForm({ ...form, color });
  };

  const setUpStationId = (upStationId: StationId) => {
    setForm({ ...form, upStationId });
  };

  const setDownStationId = (downStationId: StationId) => {
    setForm({ ...form, downStationId });
  };

  const setDistance = (distance: number) => {
    setForm({ ...form, distance });
  };

  return {
    form,

    setName,
    setDistance,
    setDownStationId,
    setUpStationId,
    setColor,

    isValidName,
    isValidColor,
    isValidForm,
    isSelectedUpStation,
    availableDownStations,
  };
};

export default useLineAddForm;
