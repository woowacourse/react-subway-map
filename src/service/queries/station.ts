import {
  requestAddStation,
  requestDeleteStation,
  requestStations,
} from './../request/station';
import { useQuery, useMutation } from 'react-query';
import { QUERY } from './../../constants/API';
import { StationForm, StationId, Station } from './../../types';

export const useStationsQuery = (accessToken: string) => {
  return useQuery<Station[]>(QUERY.REQUEST_STATIONS, () =>
    requestStations(accessToken)
  );
};

export const useStationAddMutation = (accessToken: string) => {
  return useMutation((form: StationForm) =>
    requestAddStation(form, accessToken)
  );
};

export const useStationDeleteMutation = (accessToken: string) => {
  return useMutation((stationId: StationId) =>
    requestDeleteStation(stationId, accessToken)
  );
};
