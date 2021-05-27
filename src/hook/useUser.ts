import { useSelector } from 'react-redux';
import { RootState } from '../modules';
const useUser = () => {
  const { serverName, baseURL, email, accessToken, error } = useSelector((state: RootState) => state.user);

  return { serverName, baseURL, email, accessToken, error };
};

export default useUser;
