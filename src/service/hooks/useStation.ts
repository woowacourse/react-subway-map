import { useQueryClient } from 'react-query';
import { QUERY } from './../../constants/API';
import {
  useStationAddMutation,
  useStationDeleteMutation,
  useStationsQuery,
} from '../queries/station';
import { useLinesQuery } from '../queries/line';
import { Line, StationForm, StationId } from '../../types';

const useStation = (accessToken: string) => {
  const stationsQuery = useStationsQuery(accessToken);
  const addMutation = useStationAddMutation(accessToken);
  const deleteMutation = useStationDeleteMutation(accessToken);
  const linesQuery = useLinesQuery(accessToken);
  const queryClient = useQueryClient();

  const addStation = (form: StationForm) => {
    addMutation.mutate(form, {
      onSuccess: () => queryClient.invalidateQueries(QUERY.REQUEST_STATIONS),
      onError: () => alert('역을 추가하지 못했습니다!'),
    });
  };

  const isStationInLine = (lines: Line[], stationId: number) => {
    return lines.some((line: Line) =>
      line.stations.some((station) => station.id === stationId)
    );
  };

  const deleteStation = async (stationId: StationId) => {
    if (isStationInLine(linesQuery.data ?? [], stationId)) {
      alert('노선에 등록된 역은 삭제하실 수 없습니다.');
    }

    await deleteMutation.mutate(stationId, {
      onSuccess: () => queryClient.invalidateQueries(QUERY.REQUEST_STATIONS),
      onError: () => alert('역을 삭제하지 못했습니다!'),
    });
  };

  return {
    stationsQuery,
    addStation,
    deleteStation,
    deleteMutation,
    addMutation,
  };
};

export default useStation;
