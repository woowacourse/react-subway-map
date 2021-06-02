import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie } from '../hooks';
import { getLines, addLine, clearLineProgress, removeLine } from '../redux/lineSlice';
import { LINE } from '../constants';

export const useLine = () => {
  const dispatch = useDispatch();
  const { lines, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.line);
  const { accessTokenInCookie: accessToken, endpoint } = useCookie();
  const { enqueueSnackbar } = useSnackbar();

  const requestGetLines = () => {
    dispatch(getLines({ endpoint, accessToken }));
  };

  const requestAddLine = ({ name, upStationId, downStationId, distance, color }) => {
    dispatch(addLine({ endpoint, accessToken, name, upStationId, downStationId, distance, color }));
  };

  const requestDeleteLine = (id) => {
    dispatch(removeLine({ endpoint, accessToken, id }));
  };

  const notifyAddResult = () => {
    if (isAddSuccess) {
      enqueueSnackbar(LINE.ADD_SUCCEED);
    }
    if (isAddFail) {
      enqueueSnackbar(LINE.ADD_FAIL);
    }
    dispatch(clearLineProgress());
  };

  const notifyDeleteResult = () => {
    if (isDeleteSuccess) {
      enqueueSnackbar(LINE.DELETE_SUCCEED);
    }
    if (isDeleteFail) {
      enqueueSnackbar(LINE.DELETE_FAIL);
    }
    dispatch(clearLineProgress());
  };

  return {
    lines,
    requestGetLines,

    isAddSuccess,
    isAddFail,
    requestAddLine,
    notifyAddResult,

    isDeleteSuccess,
    isDeleteFail,
    requestDeleteLine,
    notifyDeleteResult,
  };
};
