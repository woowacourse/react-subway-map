import { requestAddSection, requestDeleteSection } from './../request/section';
import { LineId, SectionForm, StationId } from './../../types';
import { useMutation } from 'react-query';

export const useSectionAddMutation = (
  currentLineId: LineId,
  accessToken: string
) =>
  useMutation((form: SectionForm) =>
    requestAddSection(currentLineId, form, accessToken)
  );

export const useSectionDeleteMutation = (
  currentLineId: LineId,
  accessToken: string
) =>
  useMutation((stationId: StationId) =>
    requestDeleteSection(currentLineId, stationId, accessToken)
  );
