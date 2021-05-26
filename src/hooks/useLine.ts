import { requestLines } from '../service/line';
import { useQuery } from 'react-query';
import useLogin from './useLogin';

const useLine = () => {
  const { accessToken } = useLogin();
  const lines = useQuery('requestLines', () => requestLines(accessToken));

  return { lines };
};

export default useLine;
