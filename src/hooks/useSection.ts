import { requestDeleteSection, requestSection } from './../service/section';
import { useEffect, useState } from 'react';
import { Line, LineDetail, Section, StationId } from '../types';
import useLine from './useLine';
import useLogin from './useLogin';
import { useMutation, useQueryClient } from 'react-query';

const useSection = () => {
  const [currentLineId, setCurrentLineId] = useState(0);
  const [currentLineDetail, setCurrentLineDetail] = useState<LineDetail>({
    id: 0,
    name: '',
    color: 'red',
    stations: [],
    sections: [],
  });
  const { accessToken } = useLogin();
  const deleteSectionMutation = useMutation(
    (stationId: StationId) =>
      requestDeleteSection(currentLineId, stationId, accessToken),
    { onSuccess: () => updateCurrenSection() }
  );

  useEffect(() => {
    if (!currentLineDetail) return;

    updateCurrenSection();
  }, [currentLineId]);

  const updateCurrenSection = async () => {
    if (!currentLineId) return;

    const data = await requestSection(currentLineId, accessToken);

    setCurrentLineDetail(data);
  };

  const deleteSection = async (stationId: StationId) => {
    deleteSectionMutation.mutate(stationId);
  };

  return { currentLineId, setCurrentLineId, currentLineDetail, deleteSection };
};

export default useSection;
