import {
  requestLines,
  requestAddLine,
  requestDeleteLine,
} from '../service/line';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useLogin from './useLogin';
import { useState } from 'react';
import { LineColor, lineColors, LineForm, LineId, StationId } from '../types';
import useStation from './useStation';
import { REGEX } from '../constants/validate';

const useLine = () => {
  const [form, setForm] = useState<LineForm>({
    name: '',
    color: '',
    upStationId: -1,
    downStationId: -1,
    distance: 0,
  });
  const { name, color, upStationId, downStationId, distance } = form;

  const { accessToken } = useLogin();
  const { stations } = useStation();
  const queryClient = useQueryClient();
  const lines = useQuery('requestLines', () => requestLines(accessToken));
  const addLineMutation = useMutation(() => requestAddLine(form, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries('requestLines');
    },
  });

  const deleteLineMutation = useMutation(
    (lineId: LineId) => requestDeleteLine(lineId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requestLines');
      },
    }
  );

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const setColor = (color: string) => {
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

  const addLine = () => {
    addLineMutation.mutate();
  };

  const deleteLine = (lineId: LineId) => {
    deleteLineMutation.mutate(lineId);
  };

  const availableDownStations = stations.isSuccess
    ? stations.data.filter((station) => station.id !== upStationId)
    : [];

  const isValidName = REGEX.LINE_NAME.test(name);

  const isValidColor = lineColors.includes(color as LineColor);

  const isValidDistance = distance > 0;

  const isSelectedUpStation = upStationId !== -1;

  const isSelectedDownStation = downStationId !== -1;

  const isValidForm =
    isValidName &&
    isValidColor &&
    isValidDistance &&
    isSelectedUpStation &&
    isSelectedDownStation;

  return {
    name,
    color,
    upStationId,
    downStationId,
    distance,
    lines,
    setName,
    setDistance,
    setDownStationId,
    setUpStationId,
    setColor,
    addLine,
    deleteLine,
    isValidName,
    isValidColor,
    isValidForm,
    isSelectedUpStation,
    availableDownStations,
  };
};

export default useLine;
