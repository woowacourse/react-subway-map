import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie } from '../hooks';
import { getMap, addSection, clearMapProgress, removeSection } from '../redux/mapSlice';
import { SECTION } from '../constants';

export const useSection = () => {
  const dispatch = useDispatch();
  const { map, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.map);
  const { accessTokenInCookie: accessToken, endpoint } = useCookie();
  const { enqueueSnackbar } = useSnackbar();

  const requestGetMap = () => {
    dispatch(getMap({ endpoint, accessToken }));
  };

  const requestAddSection = ({ lineId, upStationId, downStationId, distance }) => {
    dispatch(addSection({ endpoint, accessToken, lineId, upStationId, downStationId, distance }));
  };

  const requestDeleteSection = ({ lineId, stationId }) => {
    dispatch(removeSection({ endpoint, accessToken, lineId, stationId }));
  };

  const notifyAddResult = () => {
    if (isAddSuccess) {
      enqueueSnackbar(SECTION.ADD_SUCCEED);
    }
    if (isAddFail) {
      enqueueSnackbar(SECTION.ADD_FAIL);
    }
    dispatch(clearMapProgress());
  };

  const notifyDeleteResult = () => {
    if (isDeleteSuccess) {
      enqueueSnackbar(SECTION.DELETE_SUCCEED);
    }
    if (isDeleteFail) {
      enqueueSnackbar(SECTION.DELETE_FAIL);
    }
    dispatch(clearMapProgress());
  };

  return {
    map,
    requestGetMap,

    isAddSuccess,
    isAddFail,
    requestAddSection,
    notifyAddResult,

    isDeleteSuccess,
    isDeleteFail,
    requestDeleteSection,
    notifyDeleteResult,
  };
};
