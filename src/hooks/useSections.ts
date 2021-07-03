import { ChangeEventHandler, FormEventHandler, useContext, useEffect, useState } from 'react';

import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';

import { SECTION_VALUE } from '../constants/values';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../constants/messages';

import useInput from './useInput';
import useLines from './useLines';
import useStations from './useStations';
import api from '../apis';
import { RequestTypeSection } from '../apis/types';
import REGEX from '../constants/regex';
import { Line, Station, Validation } from '../types';
import { LoadingContext } from '../contexts/LoadingContext';

const useSections = (initialStations: Station[], initialLines: Line[]) => {
  const { stations, fetchStations } = useStations(initialStations);
  const { lines, fetchLines, fetchLine } = useLines(initialLines);

  const [selectedLineId, setSelectedLineId] = useState(-1);
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');
  const currentLine = lines.find((line) => line.id === selectedLineId);

  const addMessage = useContext(SnackBarContext)?.addMessage;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  const isOnlyOneStationInCurrentLine = Boolean(
    Number(currentLine?.stations.some(({ id }) => id === Number(upStationId))) ^
      Number(currentLine?.stations.some(({ id }) => id === Number(downStationId)))
  );
  const isStationSelectDuplicated = upStationId === downStationId;
  const isDistanceValid =
    REGEX.ONLY_DIGIT.test(distance) &&
    Number(distance) >= SECTION_VALUE.DISTANCE_MIN_VALUE &&
    Number(distance) <= SECTION_VALUE.DISTANCE_MAX_VALUE;

  const stationSelectErrorMessage =
    upStationId && downStationId
      ? isStationSelectDuplicated
        ? ERROR_MESSAGE.DUPLICATED_TERMINAL
        : isOnlyOneStationInCurrentLine
        ? ''
        : ERROR_MESSAGE.ONLY_ONE_STATION_INCLUDED
      : '';
  const distanceErrorMessage = distance && !isDistanceValid ? ERROR_MESSAGE.INVALID_DISTANCE : '';
  const isFormCompleted =
    upStationId &&
    downStationId &&
    distance &&
    !isStationSelectDuplicated &&
    isDistanceValid &&
    isOnlyOneStationInCurrentLine;

  useEffect(() => {
    callWithLoading?.(Promise.all.bind(Promise), [fetchStations(), fetchLines()]);
  }, []);

  const addSection = async (lineId: number, data: RequestTypeSection): Promise<void> => {
    const { message, result } = await api.section.post(lineId, data);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    addMessage?.(message);
  };

  const deleteSection = async (lineId: number, stationId: number): Promise<void> => {
    const { message, result } = await api.section.delete(lineId, stationId);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    addMessage?.(message);
  };

  const getLine = async (lineId: number) => {
    callWithLoading?.(fetchLine, lineId);
  };

  const resetForm = () => {
    setUpStationId('');
    setDownStationId('');
    setDistance('');
  };

  const onLineSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedLineId(Number(event.target.value));
  };

  const onUpStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUpStationId(event.target.value);
  };

  const onDownStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDownStationId(event.target.value);
  };

  const onSectionSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!currentLine) {
      addMessage?.(ERROR_MESSAGE.NO_LINE_SELECTED);
      return;
    }

    if (!isFormCompleted) {
      addMessage?.(ERROR_MESSAGE.INCOMPLETE_FORM);
      return;
    }

    const newSection = {
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    };

    await addSection(selectedLineId, newSection);
    await getLine(selectedLineId);
    resetForm();
  };

  const onSectionDelete = async (stationId: number, stationName: string) => {
    if (stationId === -1 || stationName === '') return;

    if (currentLine?.stations.length === 1) {
      addMessage?.(ERROR_MESSAGE.SECTION_LENGTH_OUT_OF_RANGE);
      return;
    }

    if (!window.confirm(CONFIRM_MESSAGE.DELETE_SECTION(currentLine?.name ?? '', stationName))) {
      return;
    }

    await deleteSection(selectedLineId, stationId);
    await getLine(selectedLineId);
  };

  const formValue = { upStationId, downStationId, distance };
  const handler = {
    onLineSelect,
    onUpStationIdChange,
    onDownStationIdChange,
    onDistanceChange,
    onSectionSubmit,
    onSectionDelete,
  };
  const validation: { [key: string]: Validation } = {
    stationSelect: {
      text: stationSelectErrorMessage,
      isValid: isOnlyOneStationInCurrentLine && !isStationSelectDuplicated,
    },
    distance: { text: distanceErrorMessage, isValid: isDistanceValid },
  };

  return {
    stations,
    lines,
    currentLine,
    formValue,
    handler,
    validation,
  };
};

export default useSections;
