import {
  requestLines,
  requestAddLine,
  requestDeleteLine,
} from './../request/line';
import { useMutation, useQuery } from 'react-query';
import { Line, LineForm, LineId } from './../../types';
import { QUERY } from './../../constants/API';

export const useLinesQuery = (accessToken: string) => {
  return useQuery<Line[]>(QUERY.REQUEST_LINES, () => requestLines(accessToken));
};

export const useLineAddMutation = (accessToken: string) => {
  return useMutation((form: LineForm) => requestAddLine(form, accessToken));
};

export const useLineDeleteMutation = (accessToken: string) => {
  return useMutation((lineId: LineId) =>
    requestDeleteLine(lineId, accessToken)
  );
};
