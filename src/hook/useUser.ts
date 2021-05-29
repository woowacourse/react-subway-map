import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { resetError as _resetError } from '../modules/user/userReducer';
const useUser = () => {
  const { serverName, baseURL, email, accessToken, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const resetError = () => {
    dispatch(_resetError());
  };

  return { serverName, baseURL, email, accessToken, error, resetError };
};

export default useUser;
