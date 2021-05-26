import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectionThunk } from '../redux';

const useSectionManager = () => {
  const [selectedLineId, setSelectedLineId] = useState('');
  const dispatch = useDispatch();

  const addSection = ({ id, upStationId, downStationId, distance }) => {
    const params = { upStationId, downStationId, distance };

    dispatch(addSectionThunk({ id, params }));
  };

  return { selectedLineId, setSelectedLineId, addSection };
};

export default useSectionManager;
