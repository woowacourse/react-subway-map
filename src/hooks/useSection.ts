import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from './useStore';
import { Line, SectionAttribute, Station } from '../types';
import MESSAGE from '../constants/message';
import { addSection, deleteSection } from '../slices/lineSlice';
import useLine from './useLine';
import useStation from './useStation';

const useSection = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { stationList } = useStation();
  const { lineList, isLoading } = useLine();

  const dispatch = useAppDispatch();

  const requestAddSection = async ({ lineId, data }: SectionAttribute) => {
    try {
      const response = await dispatch(addSection({ lineId, data }));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.SECTION_ADDED, {
        variant: 'success',
      });

      return true;
    } catch ({ message }) {
      enqueueSnackbar(message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      return false;
    }
  };

  const requestDeleteSection = async ({
    lineId,
    stationId,
  }: {
    lineId: Line['id'];
    stationId: Station['id'];
  }) => {
    try {
      const response = await dispatch(deleteSection({ lineId, stationId }));

      unwrapResult(response);

      enqueueSnackbar(MESSAGE.SUCCESS.SECTION_DELETED, {
        variant: 'success',
      });

      return true;
    } catch ({ message }) {
      enqueueSnackbar(message || MESSAGE.ERROR.REQUEST_FAILURE, {
        variant: 'error',
      });

      return false;
    }
  };

  return {
    stationList,
    lineList,
    requestAddSection,
    requestDeleteSection,
    isLoading,
  };
};

export default useSection;
