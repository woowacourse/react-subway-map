import { useContext } from 'react';
import api from '../apis';
import { RequestTypeSection } from '../apis/types';
import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';

const useSections = (): [
  (lineId: number, data: RequestTypeSection) => Promise<void>,
  (lineId: number, stationId: number) => Promise<void>
] => {
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  const addSection = async (lineId: number, data: RequestTypeSection): Promise<void> => {
    const { message, result } = await api.section.post(lineId, data);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    addMessage?.(message);
  };

  const deleteSection = async (lineId: number, stationId: number): Promise<void> => {
    const { message, result } = await api.section.delete(lineId, stationId);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    addMessage?.(message);
  };

  return [addSection, deleteSection];
};

export default useSections;
