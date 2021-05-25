import { useSelector } from 'react-redux';

const useStationManager = () => {
  const { stations } = useSelector(({ subway }) => subway);

  return { stations };
};

export default useStationManager;
