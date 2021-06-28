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

  const addLine = async (form: LineForm) => {
    await addLineMutation.mutate(form);

    const { isSuccess, isError } = addLineMutation;

    if (isSuccess) {
      queryClient.invalidateQueries(QUERY.REQUEST_LINES);
    }

    if (isError) {
      alert('노선을 추가하지 못했습니다!');
    }
  };

  const deleteLine = async (lineId: LineId) => {
    await deleteLineMutation.mutate(lineId);

    if (deleteLineMutation.isSuccess) {
      queryClient.invalidateQueries(QUERY.REQUEST_LINES);
    }

    if (deleteLineMutation.isError) {
      alert('노선을 삭제하지 못했습니다!');
    }
  };

  return {
    linesQuery,
    addLine,
    deleteLine,
    addLineMutation,
    deleteLineMutation,
  };
};

export default useLine;
