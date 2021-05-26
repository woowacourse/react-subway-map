import { IResMeta } from '../hooks/useServerAPI';

export const validResponse: IResMeta = {
  isError: false,
  status: 200,
};

export const unValidResponse: IResMeta = {
  isError: true,
  status: 500,
};
