import { useEffect, useState } from 'react';
import { requestSection } from '../request/section';
import { LineDetail, LineId, SectionForm, StationId } from '../../types';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { lineAction } from '../../state/slices/line';
import { INVALID_VALUE } from '../../constants/validate';
import { lineColors } from '../../constants/service';
import {
  useSectionAddMutation,
  useSectionDeleteMutation,
} from '../queries/section';

const useSection = (accessToken: string) => {
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

  const setCurrentLineId = (currentLineId: LineId) => {
    dispatch(lineAction.setLineId(currentLineId));
  };

  const addMutation = useSectionAddMutation(currentLineId, accessToken);
  const deleteMutation = useSectionDeleteMutation(currentLineId, accessToken);

  const addSection = (form: SectionForm) => {
    addMutation.mutate(form, {
      onSuccess: () => {
        dispatch(lineAction.setShouldUpdate());
      },
      onError: () => {
        alert('구간을 추가하지 못했습니다!');
      },
    });
  };

  const deleteSection = async (stationId: StationId) => {
    await deleteMutation.mutate(stationId, {
      onSuccess: () => updateCurrentSection(),
      onError: () => alert('구간을 삭제하지 못했습니다!'),
    });
  };

  const updateCurrentSection = async () => {
    if (currentLineId === INVALID_VALUE) return;

    const data = await requestSection(currentLineId, accessToken);

    setCurrentLineDetail(data);
  };

  useEffect(() => {
    if (currentLineId === INVALID_VALUE) return;

    updateCurrentSection();
  }, [currentLineId, shouldUpdate]);

  return {
    currentLineId,
    setCurrentLineId,
    currentLineDetail,
    addSection,
    deleteSection,
    updateCurrentSection,
    deleteMutation,
    addMutation,
  };
};

export default useSection;
