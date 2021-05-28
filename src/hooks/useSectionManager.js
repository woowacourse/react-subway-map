import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectionThunk, deleteSectionThunk } from '../redux';

const useSectionManager = () => {
  const [selectedLineId, setSelectedLineId] = useState('');
  const dispatch = useDispatch();

  const addSection = async ({ id, upStationId, downStationId, distance }) => {
    try {
      const params = { upStationId, downStationId, distance };
      const resultAction = await dispatch(addSectionThunk({ id, params }));

      return unwrapResult(resultAction);
    } catch (error) {
      return error;
    }
  };

  const deleteSection = ({ lineId, stationId }) =>
    dispatch(deleteSectionThunk({ lineId, stationId }));

  return { selectedLineId, setSelectedLineId, addSection, deleteSection };
};

export default useSectionManager;
