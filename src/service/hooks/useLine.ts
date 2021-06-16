import { useLineAddMutation, useLineDeleteMutation } from './../queries/line';
import { useQueryClient } from 'react-query';
import { LineForm, LineId } from '../../types';
import { QUERY } from '../../constants/API';
import { useLinesQuery } from '../queries/line';

const useLine = (accessToken: string) => {
  const queryClient = useQueryClient();
  const linesQuery = useLinesQuery(accessToken);
  const addLineMutation = useLineAddMutation(accessToken);
  const deleteLineMutation = useLineDeleteMutation(accessToken);

  const addLine = (form: LineForm) => {
    addLineMutation.mutate(form, {
      onSuccess: () => queryClient.invalidateQueries(QUERY.REQUEST_LINES),
      onError: () => alert('노선을 추가하지 못했습니다!'),
    });
  };

  const deleteLine = (lineId: LineId) => {
    deleteLineMutation.mutate(lineId, {
      onSuccess: () => queryClient.invalidateQueries(QUERY.REQUEST_LINES),
      onError: () => alert('노선을 삭제하지 못했습니다!'),
    });
  };

  return {
    linesQuery,
    addLine,
    deleteLine,
    isAddLineSuccess: addLineMutation.isSuccess,
    isDeleteLineSuccess: deleteLineMutation.isSuccess,
  };
};

export default useLine;
