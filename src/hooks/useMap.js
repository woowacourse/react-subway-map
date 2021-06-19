import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { MESSAGE_TYPE, ROUTE, SECTION, SHOWING_MESSAGE_TIME } from '../constants';
import { addSection, clearMapState, fetchMap, removeSection } from '../redux/mapSlice';
import useAuthorization from './commons/useAuthorization';

const useMap = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState({
    id: null,
    name: null,
    color: null,
    distance: null,
    sections: null,
  });

  const { map } = useSelector((store) => store.map);
  const { enqueueSnackbar } = useSnackbar();
  const { checkIsLogin } = useAuthorization();

  const selectedLineSections = map.find((line) => line.id === selectedLine.id);
  const lines = map.map((section) => ({ id: section.id, name: section.name, color: section.color }));

  useEffect(async () => {
    if (checkIsLogin()) {
      try {
        const response = await dispatch(fetchMap());
        unwrapResult(response);
      } catch (error) {
        //TODO : error 처리
      }
    } else {
      history.push(ROUTE.LOGIN);
    }
  }, []);

  const handleOpenSectionModal = () => setIsSectionModalOpen(true);
  const handleCloseSectionModal = () => setIsSectionModalOpen(false);

  const handleSelectLine = ({ target: { value } }) => {
    const currentSelectedLine = map.find((line) => line.id === Number(value));

    setSelectedLine({
      id: currentSelectedLine.id,
      name: currentSelectedLine.name,
      color: currentSelectedLine.color,
      distance: currentSelectedLine.distance,
      sections: currentSelectedLine.sections,
    });
  };

  const handleAddSection = async (e) => {
    e.preventDefault();

    try {
      const lineId = e.target.line.value;
      const upStationId = e.target.upStation.value;
      const downStationId = e.target.downStation.value;
      const distance = e.target.distance.value;

      const response = await dispatch(addSection({ lineId, upStationId, downStationId, distance }));
      unwrapResult(response);

      dispatch(fetchMap());
      enqueueSnackbar(SECTION.ADD_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      handleCloseSectionModal();
    } catch (error) {
      enqueueSnackbar(SECTION.ADD_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearMapState());
  };

  const handleDeleteSection = async (stationId) => {
    try {
      const response = await dispatch(removeSection({ lineId: selectedLine.id, stationId }));
      unwrapResult(response);

      dispatch(fetchMap());
      enqueueSnackbar(SECTION.DELETE_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
    } catch (error) {
      enqueueSnackbar(SECTION.DELETE_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearMapState());
  };

  return {
    lines,
    handleAddSection,
    handleDeleteSection,
    handleOpenSectionModal,
    handleCloseSectionModal,
    handleSelectLine,
    isSectionModalOpen,
    selectedLine,
    selectedLineSections,
  };
};

export default useMap;
