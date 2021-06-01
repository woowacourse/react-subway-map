import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie } from '../hooks';
import { getStations, addStation, clearStationProgress, removeStation } from '../redux/stationSlice';
import { STATION } from '../constants';

export const useStation = () => {
  const dispatch = useDispatch();
  const { stations, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.station);
  const { accessTokenInCookie: accessToken, endpoint } = useCookie();
  const { enqueueSnackbar } = useSnackbar();

  const requestGetStation = () => {
    dispatch(getStations({ endpoint, accessToken }));
  };

  const requestAddStation = (name) => {
    dispatch(addStation({ endpoint, accessToken, name }));
  };

  const requestDeleteStation = (id) => {
    dispatch(removeStation({ endpoint, accessToken, id }));
  };

  const notifyAddResult = () => {
    if (isAddSuccess) {
      enqueueSnackbar(STATION.ADD_SUCCEED);
    }
    if (isAddFail) {
      enqueueSnackbar(STATION.ADD_FAIL);
    }
    dispatch(clearStationProgress());
  };

  const notifyDeleteResult = () => {
    if (isDeleteSuccess) {
      enqueueSnackbar(STATION.DELETE_SUCCEED);
    }
    if (isDeleteFail) {
      enqueueSnackbar(STATION.DELETE_FAIL);
    }
    dispatch(clearStationProgress());
  };

  return {
    stations,
    requestGetStation,

    isAddSuccess,
    isAddFail,
    requestAddStation,
    notifyAddResult,

    isDeleteSuccess,
    isDeleteFail,
    requestDeleteStation,
    notifyDeleteResult,
  };
};
