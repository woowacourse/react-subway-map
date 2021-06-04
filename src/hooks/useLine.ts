import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  requestLines,
  requestAddLine,
  requestDeleteLine,
} from '../service/line';
import useLogin from './useLogin';
import { LineForm, LineId } from '../types';
import { QUERY } from '../constants/API';

const useLine = () => {
  const { accessToken } = useLogin();
  const queryClient = useQueryClient();
  const lines = useQuery(QUERY.REQUEST_LINES, () => requestLines(accessToken), {
    onError: () => alert('노선을 불러오지 못했습니다!'),
  });

  const addLineMutation = useMutation(
    (form: LineForm) => requestAddLine(form, accessToken),
    {
      onSuccess: () => queryClient.invalidateQueries(QUERY.REQUEST_LINES),
      onError: () => alert('노선을 추가하지 못했습니다!'),
    }
  );

  const deleteLineMutation = useMutation(
    (lineId: LineId) => requestDeleteLine(lineId, accessToken),
    {
      onSuccess: () => queryClient.invalidateQueries(QUERY.REQUEST_LINES),
      onError: () => alert('노선을 삭제하지 못했습니다!'),
    }
  );

  const addLine = (form: LineForm) => {
    addLineMutation.mutate(form);
  };

  const deleteLine = (lineId: LineId) => {
    deleteLineMutation.mutate(lineId);
  };

  return {
    lines,
    addLine,
    addLineMutation,
    deleteLine,
    deleteLineMutation,
  };
};

export default useLine;
