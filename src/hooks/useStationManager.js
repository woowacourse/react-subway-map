import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RESPONSE } from '../constants';
import { addStationThunk, deleteStationThunk, setMessage } from '../redux';

const useStationManager = () => {
  const { stations } = useSelector(({ subway }) => subway);
  const dispatch = useDispatch();

  const addStation = async ({ stationName }) => {
    const params = { name: stationName };

    try {
      const resultAction = await dispatch(addStationThunk({ params }));

      unwrapResult(resultAction);
      dispatch(setMessage({ message: RESPONSE.ADD_STATION.SUCCESS }));
    } catch ({ error }) {
      dispatch(setMessage({ message: error }));
    }
  };

  const deleteStation = async ({ id }) => {
    try {
      const resultAction = await dispatch(deleteStationThunk({ id }));

      unwrapResult(resultAction);
      dispatch(setMessage({ message: RESPONSE.DELETE_STATION.SUCCESS }));
    } catch ({ error }) {
      dispatch(setMessage({ message: error }));
    }
  };

  return { stations, addStation, deleteStation };
};

export default useStationManager;
