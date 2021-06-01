import { useHistory } from 'react-router';

import { ROUTE } from '../constants';

export const useRouter = () => {
  const history = useHistory();

  const goToHome = () => history.push(ROUTE.HOME);
  const goToLogin = () => history.push(ROUTE.LOGIN);
  const goToSignUp = () => history.push(ROUTE.SING_UP);
  const goToStation = () => history.push(ROUTE.STATION);
  const goToLine = () => history.push(ROUTE.LINE);
  const goToSection = () => history.push(ROUTE.SECTION);
  const goToMap = () => history.push(ROUTE.MAP);
  const goToSearch = () => history.push(ROUTE.SEARCH);

  return {
    goToHome,
    goToLogin,
    goToSignUp,
    goToStation,
    goToLine,
    goToSection,
    goToMap,
    goToSearch,
  };
};
