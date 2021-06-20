import { useQuery } from 'react-query';
import { LineDetail } from '../../types';

import { requestMap } from '../request/map';
import { QUERY } from './../../constants/API';

export const useMapQuery = (accessToken: string) => {
  return useQuery<LineDetail[]>(QUERY.REQUEST_MAP, () =>
    requestMap(accessToken)
  );
};
