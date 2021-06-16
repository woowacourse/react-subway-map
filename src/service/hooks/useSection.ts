import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import {
  requestDeleteSection,
  requestAddSection,
  requestSection,
} from '../request/section';
import { LineDetail, LineId, SectionForm, StationId } from '../../types';
import useLogin from './useLogin';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { lineAction } from '../../state/slices/line';
import { INVALID_VALUE } from '../../constants/validate';
import { lineColors } from '../../constants/service';

const useSection = () => {
  const dispatch = useAppDispatch();

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

  const { accessToken } = useLogin();

  const setCurrentLineId = (currentLineId: LineId) => {
    dispatch(lineAction.setLineId(currentLineId));
  };

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

  const deleteSectionMutation = useMutation(
    (stationId: StationId) =>
      requestDeleteSection(currentLineId, stationId, accessToken),
    {
      onSuccess: () => updateCurrentSection(),
      onError: () => alert('구간을 삭제하지 못했습니다!'),
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

  const isAddSectionSuccess = addSectionMutation.isSuccess;
  const isDeleteSectionSuccess = deleteSectionMutation.isSuccess;

  return {
    currentLineId,
    setCurrentLineId,
    currentLineDetail,
    addSection,
    deleteSection,
    updateCurrentSection,
    isAddSectionSuccess,
    isDeleteSectionSuccess,
  };
};

export default useSection;
