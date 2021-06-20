import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LINE, MESSAGE_TYPE, SHOWING_MESSAGE_TIME } from '../constants';
import { addLine, clearLineState, fetchLines, removeLine } from '../redux/lineSlice';
import useAuthorization from './commons/useAuthorization';

const useLine = () => {
  const dispatch = useDispatch();

  const [isLineModalOpen, setIsLineModalOpen] = useState(false);

  const { lines } = useSelector((store) => store.line);
  const { enqueueSnackbar } = useSnackbar();
  useAuthorization();

  useEffect(() => {
    const getLines = async () => {
      try {
        const response = await dispatch(fetchLines());
        unwrapResult(response);
      } catch (error) {
        console.error(error);
      }
    };

    getLines();
  }, [dispatch]);

  const handleLineModalOpen = () => setIsLineModalOpen(true);
  const handleLineCloseModal = () => setIsLineModalOpen(false);

  const handleAddLine = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const upStationId = e.target.upStation.value;
      const downStationId = e.target.downStation.value;
      const distance = e.target.distance.value;
      const color = e.target.color.value;

      const response = await dispatch(addLine({ name, upStationId, downStationId, distance, color }));
      unwrapResult(response);

      enqueueSnackbar(LINE.ADD_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      handleLineCloseModal();
    } catch (error) {
      enqueueSnackbar(LINE.ADD_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearLineState());
  };

  const handleDeleteLine = async (id) => {
    try {
      const response = await dispatch(removeLine({ id }));
      unwrapResult(response);

      enqueueSnackbar(LINE.DELETE_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
    } catch (error) {
      enqueueSnackbar(LINE.DELETE_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearLineState());
  };

  return { lines, handleAddLine, handleDeleteLine, isLineModalOpen, handleLineModalOpen, handleLineCloseModal };
};

export default useLine;
