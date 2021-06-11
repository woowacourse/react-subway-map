import { changeServer } from '../slices/authSlice';
import { CREWS } from '../types';
import useAuth from './useAuth';
import { useAppDispatch } from './useStore';

const useSelectServer = () => {
  const { server, isLogin, onLogout } = useAuth();

  const dispatch = useAppDispatch();

  const requestChangeServer = (selectedServer: CREWS) => dispatch(changeServer(selectedServer));

  return { server, isLogin, onLogout, requestChangeServer };
};

export default useSelectServer;
