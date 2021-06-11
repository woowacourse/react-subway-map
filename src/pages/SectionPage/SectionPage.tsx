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
import { CONFIRM_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';
import { SECTION_VALUE } from '../../constants/values';

import useInput from '../../hooks/useInput';
import useSections from '../../hooks/useSections';
import useStations from '../../hooks/useStations';
import useLines from '../../hooks/useLines';

import { APIResponseDataStation } from '../../apis/station';
import { APIResponseDataLine } from '../../apis/line';

import { PageProps } from '../types';
import { Container, TitleBox, Form, FormBox, StationSelects, Distance } from './SectionPage.style';
import noSelectedLine from '../../assets/images/no_selected_line.png';
import { isValidRange } from '../../utils/validator';
import ERROR_TYPE from '../../constants/errorType';

const LINE_BEFORE_FETCH: APIResponseDataLine[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: APIResponseDataStation[] = [];
const NO_SELECTED_LINE = -1;

const SectionPage = ({ setIsLoading }: PageProps) => {
  const [stations, setStations, fetchStations, addStation, deleteStation, stationRequestError] =
    useStations(STATION_BEFORE_FETCH);
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine, lineRequestError] =
    useLines(LINE_BEFORE_FETCH);
  const [addSection, deleteSection, sectionRequestError] = useSections();

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');

  const [selectedLineId, setSelectedLineId] = useState<number>(NO_SELECTED_LINE);
  const currentLine = lines.find((line) => line.id === selectedLineId);

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE_100;
  const addSnackBar = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  const isOnlyOneStationInCurrentLine = Boolean(
    Number(currentLine?.stations.some(({ id }) => id === Number(upStationId))) ^
      Number(currentLine?.stations.some(({ id }) => id === Number(downStationId)))
  );
  const isStationSelectDuplicated = upStationId === downStationId;
  const isDistanceValid =
    REGEX.ONLY_DIGIT.test(distance) &&
    isValidRange(
      Number(distance),
      SECTION_VALUE.DISTANCE_MIN_VALUE,
      SECTION_VALUE.DISTANCE_MAX_VALUE
    );

  const getStationSelectErrorMessage = () => {
    if (!upStationId || !downStationId) {
      return '';
    }

    if (isStationSelectDuplicated) {
      return ERROR_MESSAGE.DUPLICATED_TERMINAL;
    }

    if (!isOnlyOneStationInCurrentLine) {
      return ERROR_MESSAGE.ONLY_ONE_STATION_INCLUDED;
    }
  };

  const stationSelectErrorMessage = getStationSelectErrorMessage();
  const distanceErrorMessage = distance && !isDistanceValid ? ERROR_MESSAGE.INVALID_DISTANCE : '';

  const isFormCompleted =
    upStationId &&
    downStationId &&
    distance &&
    !isStationSelectDuplicated &&
    isDistanceValid &&
    isOnlyOneStationInCurrentLine;

  const getLine = async (lineId: number) => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    const response = await fetchLine(lineId);

    if (!response) {
      console.error(lineRequestError);
      addSnackBar?.(lineRequestError.message);
    }

    clearTimeout(timer);
    setIsLoading(false);
  };

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    const responses = await Promise.all([fetchStations(), fetchLines()]);

    if (responses.some((response) => response === false)) {
      console.error(lineRequestError, stationRequestError);

      addSnackBar?.(ERROR_MESSAGE.DEFAULT);
      setLines([]);
      setStations([]);
    }

    clearTimeout(timer);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH) {
    return <></>;
  }

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
      addSnackBar?.(ERROR_MESSAGE.NO_LINE_SELECTED);
      return;
    }

    if (!isFormCompleted) {
      addSnackBar?.(ERROR_MESSAGE.INCOMPLETE_FORM);
      return;
    }

    const newSection = {
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    };

    const response = await addSection(selectedLineId, newSection);

    if (response) {
      await getLine(selectedLineId);
      addSnackBar?.(SUCCESS_MESSAGE.ADD_SECTION);
      reset();
      setIsFormOpened(false);

      return;
    }

    console.error(sectionRequestError);
    addSnackBar?.(sectionRequestError.message);

    if ((sectionRequestError.type = ERROR_TYPE.UNAUTHORIZED)) {
      setIsLoggedIn?.(false);
    }
  };

  const onSectionDelete = async (stationId: number, stationName: string) => {
    if (currentLine?.stations.length === 1) {
      addSnackBar?.(ERROR_MESSAGE.SECTION_LENGTH_OUT_OF_RANGE);
      return;
    }

    if (!confirm(CONFIRM_MESSAGE.DELETE_SECTION(currentLine?.name ?? '', stationName))) {
      return;
    }

    const response = await deleteSection(selectedLineId, stationId);
    if (response) {
      await getLine(selectedLineId);
      addSnackBar?.(SUCCESS_MESSAGE.DELETE_SECTION);
      return;
    }

    console.error(sectionRequestError);
    addSnackBar?.(sectionRequestError.message);

    if (sectionRequestError.type === ERROR_TYPE.UNAUTHORIZED) {
      setIsLoggedIn?.(false);
    }
  };

  return (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE_100} isOpen={isFormOpened}>
        <Heading1>지하철 구간 관리</Heading1>
        {isLoggedIn ? (
          <>
            <p>구간을 추가하시려면 '+' 버튼을 눌러주세요</p>
            <RoundButton
              type="button"
              size="m"
              backgroundColor={themeColor}
              color={PALETTE.WHITE_100}
              onClick={() => setIsFormOpened(!isFormOpened)}
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
      <FormBox backgroundColor={PALETTE.WHITE_100} isOpen={isFormOpened}>
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
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE_100}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE_100}>
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
                      backgroundColor={PALETTE.PINK_100}
                      color={PALETTE.WHITE_100}
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
