import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/store';
import { useMutation } from 'react-query';
import useLogin from './useLogin';
import {
  requestDeleteSection,
  requestAddSection,
  requestSection,
} from './../service/section';
import { lineAction } from '../state/slices/line';
import { LineDetail, LineId, SectionForm, StationId } from '../types';
import { lineColors } from '../constants/service';
import { INVALID_VALUE } from '../constants/validate';

const useSection = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useLogin();

  const [currentLineDetail, setCurrentLineDetail] = useState<LineDetail>({
    id: INVALID_VALUE,
    name: '',
    color: lineColors[0],
    stations: [],
    sections: [],
  });

  const { currentLineId, shouldUpdate } = useAppSelector(
    ({ line: { currentLineId, shouldUpdate } }) => ({
      currentLineId,
      shouldUpdate,
    })
  );

  const addSectionMutation = useMutation(
    (form: SectionForm) => requestAddSection(currentLineId, form, accessToken),
    {
      onSuccess: () => {
        dispatch(lineAction.setShouldUpdate());
      },
      onError: () => {
        alert('구간을 추가하지 못했습니다!');
      },
    }
  );

  const setCurrentLineId = (currentLineId: LineId) => {
    dispatch(lineAction.setLineId(currentLineId));
  };

  const deleteSectionMutation = useMutation(
    (stationId: StationId) =>
      requestDeleteSection(currentLineId, stationId, accessToken),
    {
      onSuccess: () => updateCurrentSection(),
      onError: () => {
        alert('구간을 삭제하지 못했습니다!');
      },
    }
  );

  useEffect(() => {
    if (currentLineId === INVALID_VALUE) return;

    updateCurrentSection();
  }, [currentLineId, shouldUpdate]);

  const updateCurrentSection = async () => {
    if (currentLineId === INVALID_VALUE) return;

    const data = await requestSection(currentLineId, accessToken);

    setCurrentLineDetail(data);
  };

  const addSection = (form: SectionForm) => {
    return addSectionMutation.mutate(form);
  };

  const deleteSection = (stationId: StationId) => {
    deleteSectionMutation.mutate(stationId);
  };

  return {
    currentLineId,
    currentLineDetail,
    addSectionMutation,
    deleteSectionMutation,
    setCurrentLineId,
    addSection,
    deleteSection,
    setCurrentLineDetail,
    updateCurrentSection,
  };
};

export default useSection;
