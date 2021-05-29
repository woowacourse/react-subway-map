import {
  requestDeleteSection,
  requestAddSection,
  requestSection,
} from './../service/section';
import { useEffect, useState } from 'react';
import { LineDetail, LineId, SectionForm, StationId } from '../types';
import useLogin from './useLogin';
import { useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from '../state/store';
import { lineAction } from '../state/slices/line';

const useSection = () => {
  const { currentLineId, shouldUpdate } = useAppSelector(
    ({ line: { currentLineId, shouldUpdate } }) => ({
      currentLineId,
      shouldUpdate,
    })
  );

  const dispatch = useAppDispatch();

  const [currentLineDetail, setCurrentLineDetail] = useState<LineDetail>({
    id: 0,
    name: '',
    color: 'red',
    stations: [],
    sections: [],
  });

  const [form, setForm] = useState<SectionForm>({
    distance: 0,
    downStationId: -1,
    upStationId: -1,
  });

  const { distance, downStationId, upStationId } = form;

  const { accessToken } = useLogin();
  const addSectionMutation = useMutation(
    () => requestAddSection(currentLineId, form, accessToken),
    {
      onSuccess: () => {
        dispatch(lineAction.setShouldUpdate());
      },
    }
  );

  const setCurrentLineId = (currentLineId: LineId) => {
    dispatch(lineAction.setLineId(currentLineId));
  };

  const deleteSectionMutation = useMutation(
    (stationId: StationId) =>
      requestDeleteSection(currentLineId, stationId, accessToken),
    { onSuccess: () => updateCurrentSection() }
  );

  useEffect(() => {
    if (currentLineId === -1) return;

    updateCurrentSection();
  }, [currentLineId, shouldUpdate]);

  useEffect(() => {
    return () => {
      dispatch(lineAction.initLineId());
    };
  }, []);

  const updateCurrentSection = async () => {
    // TODO: magic number!
    if (currentLineId === -1) return;

    const data = await requestSection(currentLineId, accessToken);

    setCurrentLineDetail(data);
  };

  const deleteSection = (stationId: StationId) => {
    deleteSectionMutation.mutate(stationId);
  };

  const addSection = () => {
    return addSectionMutation.mutate();
  };

  const setDistance = (distance: number) => {
    setForm({ ...form, distance });
  };

  const setUpStationId = (upStationId: StationId) => {
    setForm({ ...form, upStationId });
  };

  const setDownStationId = (downStationId: StationId) => {
    setForm({ ...form, downStationId });
  };

  const isSelectedLine = currentLineDetail.id !== -1;

  const isValidDistance = distance > 0;

  const isSelectedUpStation = upStationId !== -1;

  const isSelectedDownStation = downStationId !== -1;

  const isValidForm =
    isSelectedLine &&
    isValidDistance &&
    isSelectedUpStation &&
    isSelectedDownStation;

  return {
    distance,
    upStationId,
    downStationId,
    currentLineId,
    setCurrentLineId,
    currentLineDetail,
    addSection,
    deleteSection,
    setDistance,
    setUpStationId,
    setDownStationId,
    updateCurrentSection,
    isValidForm,
    isSelectedUpStation,
  };
};

export default useSection;
