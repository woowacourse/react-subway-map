import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { LS_KEY, ROUTE } from '../../constants';
import { clearUserToken } from '../../redux';
import { removeLocalStorage } from '../../utils';

const SignOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  removeLocalStorage(LS_KEY.TOKEN);
  dispatch(clearUserToken());
  history.push(ROUTE.HOME.PATH);

  return null;
};

export default SignOut;
