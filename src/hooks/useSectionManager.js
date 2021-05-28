import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RESPONSE } from '../constants';
import { addSectionThunk, deleteSectionThunk, setMessage } from '../redux';

const useSectionManager = () => {
  const [selectedLineId, setSelectedLineId] = useState('');
  const dispatch = useDispatch();

  const addSection = async ({ id, upStationId, downStationId, distance }) => {
    const params = { upStationId, downStationId, distance };

    try {
      const resultAction = await dispatch(addSectionThunk({ id, params }));
      const response = unwrapResult(resultAction);

      dispatch(setMessage({ message: RESPONSE.ADD_SECTION.SUCCESS }));

      return response;
    } catch ({ error }) {
      dispatch(setMessage({ message: error }));

      return { error };
    }
  };

  const deleteSection = async ({ lineId, stationId }) => {
    try {
      const resultAction = await dispatch(
        deleteSectionThunk({ lineId, stationId })
      );

      unwrapResult(resultAction);
      dispatch(setMessage({ message: RESPONSE.DELETE_SECTION.SUCCESS }));
    } catch ({ error }) {
      dispatch(setMessage({ message: error }));
    }
  };

  return { selectedLineId, setSelectedLineId, addSection, deleteSection };
};

export default useSectionManager;
