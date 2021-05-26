import { useDispatch, useSelector } from 'react-redux';
import { addLineThunk, deleteLineThunk } from '../redux';

const useLineManager = () => {
  const { lines } = useSelector(({ subway }) => subway);
  const dispatch = useDispatch();

  const addLine = ({
    lineName,
    color,
    upStationId,
    downStationId,
    distance,
  }) => {
    const params = {
      name: lineName,
      color,
      upStationId,
      downStationId,
      distance,
    };

    dispatch(addLineThunk({ params }));
  };

  const deleteLine = ({ id }) => dispatch(deleteLineThunk({ id }));

  return { lines, addLine, deleteLine };
};

export default useLineManager;
