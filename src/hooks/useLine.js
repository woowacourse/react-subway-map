import { useDispatch, useSelector } from 'react-redux';

import { useAccessToken, useServer } from '../hooks';
import { getLines, addLine, removeLine, clearLineStatus } from '../redux/lineSlice';

export const useLine = () => {
  const dispatch = useDispatch();
  const { lines, status } = useSelector((store) => store.line);
  const { accessToken } = useAccessToken();
  const { endpoint } = useServer();

  const requestGetLines = () => {
    dispatch(getLines({ endpoint, accessToken }));
  };

  const requestAddLine = ({ name, upStationId, downStationId, distance, color }) => {
    dispatch(addLine({ endpoint, accessToken, name, upStationId, downStationId, distance, color }));
  };

  const requestDeleteLine = (id) => {
    dispatch(removeLine({ endpoint, accessToken, id }));
  };

  const clearStatus = () => {
    dispatch(clearLineStatus());
  };

  return {
    lines,
    status,
    requestGetLines,
    requestAddLine,
    requestDeleteLine,
    clearStatus,
  };
};
