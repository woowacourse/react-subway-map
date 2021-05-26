import { useDispatch, useSelector } from 'react-redux';
import { addStationThunk, deleteStationThunk } from '../redux';

const useStationManager = () => {
  const { stations } = useSelector(({ subway }) => subway);
  const dispatch = useDispatch();

  const addStation = ({ stationName }) => {
    const params = { name: stationName };

    dispatch(addStationThunk({ params }));
  };

  const deleteStation = ({ id }) => dispatch(deleteStationThunk({ id }));

  return { stations, addStation, deleteStation };
};

export default useStationManager;
