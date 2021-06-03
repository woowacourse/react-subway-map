import {
  requestLines,
  requestAddLine,
  requestDeleteLine,
} from '../service/line';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useLogin from './useLogin';
import { useState } from 'react';
import { LineColor, LineForm, LineId, StationId } from '../types';
import useStation from './useStation';
import { INVALID_VALUE, REGEX } from '../constants/validate';
import { QUERY } from '../constants/API';
import { lineColors, SERVICE } from '../constants/service';

const useLine = () => {
  const [form, setForm] = useState<LineForm>({
    name: '',
    color: lineColors[0],
    upStationId: INVALID_VALUE,
    downStationId: INVALID_VALUE,
    distance: SERVICE.MIN_DISTANCE,
  });
  const { name, color, upStationId, downStationId, distance } = form;

  const { accessToken } = useLogin();
  const { stations } = useStation();
  const queryClient = useQueryClient();
  const lines = useQuery(QUERY.REQUEST_LINES, () => requestLines(accessToken), {
    onError: () => {
      alert('노선을 불러오지 못했습니다!');
    },
  });
  const addLineMutation = useMutation(() => requestAddLine(form, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY.REQUEST_LINES);
    },
    onError: () => {
      alert('노선을 추가하지 못했습니다!');
    },
  });

  const deleteLineMutation = useMutation(
    (lineId: LineId) => requestDeleteLine(lineId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY.REQUEST_LINES);
      },
      onError: () => {
        alert('노선을 삭제하지 못했습니다!');
      },
    }
  );

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

  const isValidDistance = distance >= SERVICE.MIN_DISTANCE;

  const isSelectedUpStation = upStationId !== INVALID_VALUE;

  const isSelectedDownStation = downStationId !== INVALID_VALUE;
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
    addLineMutation,
    deleteLineMutation,
  };
};

export default useLine;
