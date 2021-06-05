import { useContext } from 'react';
import { useHistory } from 'react-router';

import { SUCCESS_MESSAGE } from '../../../constants/messages';
import PATH from '../../../constants/path';

import { SnackBarContext } from '../../../contexts/SnackBarProvider';
import { UserContext } from '../../../contexts/UserContextProvider';

const LogoutButton = () => {
  const history = useHistory();

  const userContext = useContext(UserContext);
  const addMessage = useContext(SnackBarContext)?.addMessage;

  const onLogout = async () => {
    await userContext?.setIsLoggedIn(false);

    addMessage?.(SUCCESS_MESSAGE.LOGOUT);
    history.push(PATH.LOGIN);
  };

  return (
    <button
      onClick={() => {
        onLogout();
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
