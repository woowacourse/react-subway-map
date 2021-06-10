import {
  useContext,
  useEffect,
  useMemo,
  useState,
  FormEventHandler,
  ChangeEventHandler,
  useRef,
} from 'react';
import { MdAdd, MdArrowForward, MdDelete } from 'react-icons/md';

import Palette from '../../components/Palette/Palette';
import {
  Box,
  Select,
  Button,
  Input,
  RoundButton,
  InputContainer,
  Heading1,
  Icon,
  ErrorText,
  List,
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import REGEX from '../../constants/regex';
import PALETTE from '../../constants/palette';
import STATUS_CODE from '../../constants/statusCode';
import { CONFIRM_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';
import { LINE_VALUE } from '../../constants/values';

import useInput from '../../hooks/useInput';
import useStations from '../../hooks/useStations';
import useLines from '../../hooks/useLines';
import { APIReturnTypeStation } from '../../apis/station';
import { APIReturnTypeLine } from '../../apis/line';

import { isValidLength, isValidRange } from '../../utils/validator';
import noLine from '../../assets/images/no_line.png';
import { PageProps } from '../types';
import { Container, TitleBox, FormBox, Form, StationSelects } from './LinePage.style';

const lineColors = [
  'PINK',
  'RED',
  'ORANGE',
  'YELLOW',
  'MALCHA',
  'GREEN',
  'SKYBLUE',
  'BLUE',
  'VIOLET',
  'PURPLE',
];

const LINE_BEFORE_FETCH: APIReturnTypeLine[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: APIReturnTypeStation[] = [];

const LinePage = ({ setIsLoading }: PageProps) => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [stations, setStations, fetchStations] = useStations(STATION_BEFORE_FETCH);
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine] = useLines(LINE_BEFORE_FETCH);

  const formElement = useRef<HTMLFormElement>(null);
  const [lineName, onlineNameChange, setLineName] = useInput('');
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');

  const colors = useMemo(() => {
    const usedLineColors = lines.map((line) => line.color);

    return lineColors.map((color) => ({
      name: color,
      disabled: usedLineColors.includes(color),
    }));
  }, [lines]);

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE_100;
  const addSnackBar = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  const isLineNameValid =
    isValidLength(lineName, LINE_VALUE.NAME_MIN_LENGTH, LINE_VALUE.NAME_MAX_LENGTH) &&
    REGEX.KOREAN_DIGIT.test(lineName);
  const isLineNameDuplicated = lines.some((item) => item.name === lineName);
  const isStationSelectDuplicated = upStationId === downStationId;
  const isDistanceValid =
    REGEX.ONLY_DIGIT.test(distance) &&
    isValidRange(Number(distance), LINE_VALUE.DISTANCE_MIN_VALUE, LINE_VALUE.DISTANCE_MAX_VALUE);

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

  const reset = () => {
    setLineName('');
    setUpStationId('');
    setDownStationId('');
    setDistance('');
    formElement.current?.reset();
  };

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await Promise.all([fetchStations(), fetchLines()]);
    } catch (error) {
      console.error(error);

      addSnackBar?.(ERROR_MESSAGE.DEFAULT);
      setLines([]);
      setStations([]);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH) {
    return <></>;
  }

  const onUpStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUpStationId(event.target.value);
  };

  const onDownStationIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setDownStationId(event.target.value);
  };

  const isUnauthorizedError = (value: string): boolean => {
    return value === STATUS_CODE.UNAUTHORIZED;
  };

  const onLineSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const color = formElement.current?.['color'].value;

    if (!isFormCompleted || !color) {
      addSnackBar?.(ERROR_MESSAGE.INCOMPLETE_FORM);
      return;
    }

    try {
      const newLine = {
        name: lineName,
        color,
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        distance: Number(distance),
      };

      await addLine(newLine);

      addSnackBar?.(SUCCESS_MESSAGE.ADD_LINE);
      await fetchData();

      reset();
      setIsFormOpened(false);
    } catch (error) {
      console.error(error);

      if (isUnauthorizedError(error.message)) {
        addSnackBar?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);

        return;
      }

      addSnackBar?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const onLineDelete = async (id: number, name: string) => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_LINE(name))) {
      return;
    }

    try {
      await deleteLine(id);
      await fetchData();
      addSnackBar?.(SUCCESS_MESSAGE.DELETE_LINE);
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addSnackBar?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);

        return;
      }

      addSnackBar?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  return (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE_100} isOpen={isFormOpened}>
        <Heading1>지하철 노선 관리</Heading1>
        {isLoggedIn ? (
          <>
            <p>노선을 추가하시려면 '+' 버튼을 눌러주세요</p>
            <RoundButton
              type="button"
              size="m"
              backgroundColor={themeColor}
              color={PALETTE.WHITE_100}
              onClick={() => setIsFormOpened(!isFormOpened)}
              aria-label="노선 추가"
            >
              <MdAdd size="1.5rem" />
            </RoundButton>
          </>
        ) : (
          <p>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</p>
        )}
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE_100} isOpen={isFormOpened}>
        <Form onSubmit={onLineSubmit} aria-label="노선 추가 양식" ref={formElement}>
          <InputContainer
            labelText="노선 이름"
            validation={{ text: lineNameErrorMessage, isValid: false }}
          >
            <Input
              value={lineName}
              onChange={onlineNameChange}
              aria-label="지하철 노선 이름 입력"
            />
          </InputContainer>
          <StationSelects>
            <div>
              <InputContainer labelText="상행 종점">
                <Select
                  value={upStationId}
                  onChange={onUpStationIdChange}
                  aria-label="상행종점 선택"
                >
                  <option value="/" hidden>
                    역 선택
                  </option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </Select>
              </InputContainer>
              <Icon>
                <MdArrowForward size="1.5rem" />
              </Icon>
              <InputContainer labelText="하행 종점">
                <Select
                  value={downStationId}
                  onChange={onDownStationIdChange}
                  aria-label="하행종점 선택"
                >
                  <option value="/" hidden>
                    역 선택
                  </option>
                  {stations.map((station) => (
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
          <InputContainer labelText="색상을 선택하세요 (이미 등록된 색상은 선택할 수 없습니다.)">
            <Palette inputName={'color'} colors={colors} />
          </InputContainer>
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE_100}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE_100}>
        {lines.length === 0 ? (
          <img src={noLine} alt="지하철 노선 없음 이미지" />
        ) : (
          <List aria-label="노선 목록">
            {lines.map(({ id, name, color }) => (
              <li key={id}>
                <ColorDot size="s" backgroundColor={color} />
                <p>{name}</p>
                {isLoggedIn && (
                  <Button
                    type="button"
                    size="s"
                    backgroundColor={PALETTE.PINK_100}
                    color={PALETTE.WHITE_100}
                    onClick={() => onLineDelete(id, name)}
                    aria-label={`${name} 삭제`}
                  >
                    <MdDelete size="15px" />
                  </Button>
                )}
              </li>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default LinePage;
