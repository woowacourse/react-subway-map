import { useDispatch, useSelector } from 'react-redux';
import { addStationThunk } from '../redux';

const useStationManager = () => {
  const { stations } = useSelector(({ subway }) => subway);
  const dispatch = useDispatch();

  const addStation = ({ stationName }) =>
    dispatch(addStationThunk({ name: stationName }));

  return { stations, addStation };
};

export default useStationManager;
