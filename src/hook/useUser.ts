import { useDispatch, useSelector } from 'react-redux';
import { ServerInfo, SignInRequest } from '../interfaces';
import { RootState } from '../modules';
import { selectServer as _selectServer, loginAsync, resetError as _resetError } from '../modules/user/userReducer';

const useUser = () => {
  const { serverName, baseURL, email, accessToken, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const selectServer = (serverInfo: ServerInfo) => {
    dispatch(_selectServer(serverInfo));
  };

  const login = (loginInfo: SignInRequest) => {
    dispatch(loginAsync(loginInfo));
  };

  const resetError = () => {
    dispatch(_resetError());
  };

  return { serverName, baseURL, email, accessToken, selectServer, login, error, resetError };
};

export default useUser;
