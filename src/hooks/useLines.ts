import { ChangeEventHandler, FormEventHandler, useCallback, useContext, useState } from 'react';
import api from '../apis';
import { RequestTypeLine } from '../apis/types';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../constants/messages';
import REGEX from '../constants/regex';
import { LINE_VALUE } from '../constants/values';
import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';
import { Line, Validation } from '../types';
import useInput from './useInput';

const useLines = (initialLines: Line[]) => {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [lineName, onLineNameChange, setLineName] = useInput('');
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');

  const addMessage = useContext(SnackBarContext)?.addMessage;
  const logout = useContext(UserContext)?.logout;

  const isLineNameValid =
    lineName.length >= LINE_VALUE.NAME_MIN_LENGTH &&
    lineName.length <= LINE_VALUE.NAME_MAX_LENGTH &&
    REGEX.KOREAN_DIGIT.test(lineName);
  const isLineNameDuplicated = lines.some((item) => item.name === lineName);
  const isStationSelectDuplicated = upStationId === downStationId;
  const isDistanceValid =
    REGEX.ONLY_DIGIT.test(distance) &&
    Number(distance) >= LINE_VALUE.DISTANCE_MIN_VALUE &&
    Number(distance) <= LINE_VALUE.DISTANCE_MAX_VALUE;

  const lineNameErrorMessage =
    lineName &&
    (!isLineNameValid
      ? ERROR_MESSAGE.INVALID_LINE_INPUT
      : isLineNameDuplicated
      ? ERROR_MESSAGE.DUPLICATED_LINE_NAME
      : '');
  const stationSelectErrorMessage =
    upStationId && downStationId && isStationSelectDuplicated
      ? ERROR_MESSAGE.DUPLICATED_TERMINAL
      : '';
  const distanceErrorMessage = distance && !isDistanceValid ? ERROR_MESSAGE.INVALID_DISTANCE : '';
  const isFormCompleted =
    lineName &&
    upStationId &&
    downStationId &&
    distance &&
    isLineNameValid &&
    !isLineNameDuplicated &&
    !isStationSelectDuplicated &&
    isDistanceValid;

  const fetchLine = async (lineId: number): Promise<void> => {
    const { isSucceeded, message, result } = await api.line.getOne(lineId);

    if (isSucceeded) {
      setLines((prevLines) =>
        prevLines.map((line) => {
          if (line.id === lineId && result) {
            return result;
          }
          return line;
        })
      );
    } else {
      addMessage?.(message);
    }
  };

  const fetchLines = useCallback(async (): Promise<void> => {
    const { isSucceeded, message, result } = await api.line.get();

    setLines(result ?? []);

    if (!isSucceeded) {
      addMessage?.(message);
    }
  }, [addMessage]);

  const addLine = async (data: RequestTypeLine): Promise<void> => {
    const { message, result } = await api.line.post(data);

    if (result && !result.auth) {
      logout?.();

      return;
    }

    addMessage?.(message);
    await fetchLines();
  };

  const deleteLine = async (lineId: number): Promise<void> => {
    const { message, result } = await api.line.delete(lineId);

    if (result && !result.auth) {
      logout?.();

      return;
    }

    addMessage?.(message);
    await fetchLines();
  };

  const resetForm = () => {
    setLineName('');
    setUpStationId('');
    setDownStationId('');
    setDistance('');
  };

  const onUpStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUpStationId(event.target.value);
  };

  const onDownStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDownStationId(event.target.value);
  };

  const onLineSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const color = formElement['color'].value;

    if (!isFormCompleted || !color) {
      addMessage?.(ERROR_MESSAGE.INCOMPLETE_FORM);
      return;
    }

    const newLine = {
      name: lineName,
      color,
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    };

    await addLine(newLine);
    formElement.reset();
    resetForm();
  };

  const onLineDelete = async (id: number, name: string) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_LINE(name))) return;

    await deleteLine(id);
  };

  const formValue = { lineName, upStationId, downStationId, distance };
  const handler = {
    onLineNameChange,
    onDistanceChange,
    onUpStationIdChange,
    onDownStationIdChange,
    onLineSubmit,
    onLineDelete,
  };
  const validation: { [key: string]: Validation } = {
    lineName: { text: lineNameErrorMessage, isValid: isLineNameValid && !isLineNameDuplicated },
    stationSelect: { text: stationSelectErrorMessage, isValid: !isStationSelectDuplicated },
    distance: { text: distanceErrorMessage, isValid: isDistanceValid },
  };

  return {
    lines,
    setLines,
    fetchLine,
    fetchLines,
    formValue,
    handler,
    validation,
  };
};

export default useLines;
