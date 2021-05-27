import {
  requestDeleteSection,
  requestAddSection,
  requestSection,
} from './../service/section';
import { useEffect, useState } from 'react';
import { LineDetail, SectionForm, StationId } from '../types';
import useLogin from './useLogin';
import { useMutation } from 'react-query';

const useSection = () => {
  const [currentLineId, setCurrentLineId] = useState(0);
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
    { onSuccess: () => updateCurrentSection() }
  );

  const deleteSectionMutation = useMutation(
    (stationId: StationId) =>
      requestDeleteSection(currentLineId, stationId, accessToken),
    { onSuccess: () => updateCurrentSection() }
  );

  useEffect(() => {
    if (!currentLineDetail) return;

    updateCurrentSection();
  }, [currentLineId]);

  const updateCurrentSection = async () => {
    if (!currentLineId) return;

    const data = await requestSection(currentLineId, accessToken);

    setCurrentLineDetail(data);
  };

  const deleteSection = (stationId: StationId) => {
    deleteSectionMutation.mutate(stationId);
  };

  const addSection = async () => {
    addSectionMutation.mutate();
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
  };
};

export default useSection;
