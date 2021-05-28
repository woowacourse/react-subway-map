import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RESPONSE } from '../constants';
import { addLineThunk, deleteLineThunk, setMessage } from '../redux';

const useLineManager = () => {
  const { lines } = useSelector(({ subway }) => subway);
  const dispatch = useDispatch();

  const addLine = async ({
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

    try {
      const resultAction = await dispatch(addLineThunk({ params }));

      unwrapResult(resultAction);
      dispatch(setMessage({ message: RESPONSE.ADD_LINE.SUCCESS }));
    } catch ({ error }) {
      dispatch(setMessage({ message: error }));
    }
  };

  const deleteLine = async ({ id }) => {
    try {
      const resultAction = await dispatch(deleteLineThunk({ id }));

      unwrapResult(resultAction);
      dispatch(setMessage({ message: RESPONSE.DELETE_LINE.SUCCESS }));
    } catch ({ error }) {
      dispatch(setMessage({ message: error }));
    }
  };

  return { lines, addLine, deleteLine };
};

export default useLineManager;
