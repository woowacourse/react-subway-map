import { ChangeEventHandler, useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdAdd, MdArrowForward, MdDelete } from 'react-icons/md';

import {
  Box,
  Button,
  Input,
  Select,
  InputContainer,
  RoundButton,
  Heading1,
  Icon,
  ErrorText,
  List,
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import PALETTE from '../../constants/palette';
import REGEX from '../../constants/regex';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/messages';
import { SECTION_VALUE } from '../../constants/values';

import useInput from '../../hooks/useInput';
import useStations from '../../hooks/useStations';
import useSections from '../../hooks/useSections';
import useLines from '../../hooks/useLines';

import { Container, TitleBox, Form, FormBox, StationSelects, Distance } from './SectionPage.style';
import noSelectedLine from '../../assets/images/no_selected_line.png';
import { Line, Station } from '../../types';
import { LoadingContext } from '../../contexts/LoadingContext';

const LINE_BEFORE_FETCH: Line[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: Station[] = [];

const SectionPage = () => {
  const [selectedLineId, setSelectedLineId] = useState<number>(-1);

  const { stations, fetchStations } = useStations(STATION_BEFORE_FETCH);
  const { lines, fetchLines, fetchLine } = useLines(LINE_BEFORE_FETCH);
  const [addSection, deleteSection] = useSections();

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const { isLoggedIn } = useContext(UserContext) ?? {};
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  const currentLine = lines.find((line) => line.id === selectedLineId);

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

  const getLine = async (lineId: number) => {
    callWithLoading?.(fetchLine, lineId);
  };

  useEffect(() => {
    callWithLoading?.(Promise.all, [fetchStations(), fetchLines()]);
  }, []);

  const reset = () => {
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
    reset();
    setFormOpen(false);
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

  return lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH ? (
    <></>
  ) : (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Heading1>지하철 구간 관리</Heading1>

        {isLoggedIn ? (
          <>
            <p>구간을 추가하시려면 '+' 버튼을 눌러주세요</p>
            <RoundButton
              type="button"
              size="m"
              backgroundColor={themeColor}
              color={PALETTE.WHITE}
              onClick={() => setFormOpen(!formOpen)}
              aria-label="구간 추가"
            >
              <MdAdd size="1.5rem" />
            </RoundButton>
          </>
        ) : (
          <p>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</p>
        )}
        <InputContainer labelText="노선 선택">
          <ColorDot size="s" backgroundColor={currentLine?.color} />
          <Select onChange={onLineSelect} aria-label="노선 선택">
            <option value="/" hidden>
              노선 선택
            </option>
            {lines?.map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </Select>
        </InputContainer>
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Form onSubmit={onSectionSubmit}>
          <StationSelects>
            <div>
              <InputContainer labelText="상행역">
                <Select value={upStationId} onChange={onUpStationIdChange} aria-label="상행역 선택">
                  <option value="/" hidden>
                    역 선택
                  </option>
                  {stations?.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </Select>
              </InputContainer>
              <Icon>
                <MdArrowForward size="1.5rem" />
              </Icon>
              <InputContainer labelText="하행역">
                <Select
                  value={downStationId}
                  onChange={onDownStationIdChange}
                  aria-label="하행역 선택"
                >
                  <option value="/" hidden>
                    역 선택
                  </option>
                  {stations?.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </Select>
              </InputContainer>
            </div>
            <ErrorText>{stationSelectErrorMessage}</ErrorText>
          </StationSelects>
          <InputContainer
            labelText="거리 (단위:km)"
            validation={{ text: distanceErrorMessage, isValid: false }}
          >
            <Input value={distance} onChange={onDistanceChange} aria-label="거리 입력" />
          </InputContainer>
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
        {!currentLine ? (
          <img src={noSelectedLine} alt="노선 선택 안내 메시지" />
        ) : (
          <List position="relative" aria-label="구간 목록">
            {currentLine.stations.map(({ id, name, distance }) => {
              return (
                <li key={id}>
                  <ColorDot size="s" backgroundColor={currentLine.color} />
                  <p>{name}</p>
                  {distance && <Distance>{`거리 : ${distance}`}</Distance>}
                  {isLoggedIn && (
                    <Button
                      type="button"
                      size="s"
                      backgroundColor={PALETTE.PINK}
                      color={PALETTE.WHITE}
                      onClick={() => onSectionDelete(id, name)}
                      aria-label={`${name} 삭제`}
                    >
                      <MdDelete size="15px" />
                    </Button>
                  )}
                </li>
              );
            })}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default SectionPage;
