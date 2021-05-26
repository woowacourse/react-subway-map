import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectionThunk, deleteSectionThunk } from '../redux';

const useSectionManager = () => {
  const [selectedLineId, setSelectedLineId] = useState('');
  const dispatch = useDispatch();

  const addSection = ({ id, upStationId, downStationId, distance }) => {
    const params = { upStationId, downStationId, distance };

    dispatch(addSectionThunk({ id, params }));
  };

  const deleteSection = ({ lineId, stationId }) =>
    dispatch(deleteSectionThunk({ lineId, stationId }));

  return { selectedLineId, setSelectedLineId, addSection, deleteSection };
};

export default useSectionManager;
