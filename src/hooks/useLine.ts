import {
  requestLines,
  requestAddLine,
  requestDeleteLine,
} from '../service/line';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useLogin from './useLogin';
import { useState } from 'react';
import { LineForm, LineId, StationId } from '../types';

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

  const isLineNameValid = name.length > 2;

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
    isLineNameValid,
  };
};

export default useLine;
