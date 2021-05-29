import { IResMeta } from '../type';

export const validResponse: IResMeta = {
  isError: false,
  message: '',
};

export const unValidResponse: IResMeta = {
  isError: true,
  message: '잘못된 응답',
};
