import { useSelector } from 'react-redux';

const useAuthorization = () => {
  const { isLogin } = useSelector((store) => store.user);

  const checkIsLogin = () => isLogin;

  return { checkIsLogin };
};

export default useAuthorization;
