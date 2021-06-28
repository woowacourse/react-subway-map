import { useQuery } from 'react-query';
import { requestLines } from './../request/line';
import { Line } from '../../types';
import { QUERY } from './../../constants/API';

export const useMapQuery = (accessToken: string) => {
  return useQuery<Line[]>(QUERY.REQUEST_MAP, () => requestLines(accessToken));
};
