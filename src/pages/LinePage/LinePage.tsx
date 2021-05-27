import {
  useContext,
  useEffect,
  useMemo,
  useState,
  FormEventHandler,
  ChangeEventHandler,
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
import apiRequest, { APIReturnTypeStation, APIReturnTypeLine } from '../../request';
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
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [stations, setStations] = useState<APIReturnTypeStation[]>(STATION_BEFORE_FETCH);
  const [lines, setLines] = useState<APIReturnTypeLine[]>(LINE_BEFORE_FETCH);
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

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext) ?? {};

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

  const reset = () => {
    setLineName('');
    setUpStationId('');
    setDownStationId('');
    setDistance('');
  };

  const fetchLines = async () => {
    const newLines: APIReturnTypeLine[] = await apiRequest.getLines();

    setLines(newLines);
  };

  const fetchStations = async () => {
    const newStations: APIReturnTypeStation[] = await apiRequest.getStations();

    setStations(newStations);
  };

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await Promise.all([fetchStations(), fetchLines()]);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
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

  const onLineSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const color = formElement['color'].value;

    if (!isFormCompleted || !color) {
      addMessage?.(ERROR_MESSAGE.INCOMPLETE_FORM);
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

      const response = await apiRequest.addLine(newLine);

      addMessage?.(SUCCESS_MESSAGE.ADD_LINE);
      await fetchData();

      reset();
      formElement.reset();
      setFormOpen(false);
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addMessage?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);

        return;
      }

      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const onLineDelete = async (id: number, name: string) => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_LINE(name))) return;
    try {
      await apiRequest.deleteLine(id);
      await fetchData();
      addMessage?.(SUCCESS_MESSAGE.DELETE_LINE);
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addMessage?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);

        return;
      }

      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  return (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Heading1>지하철 노선 관리</Heading1>
        {isLoggedIn ? (
          <>
            <p>노선을 추가하시려면 '+' 버튼을 눌러주세요</p>
            <RoundButton
              type="button"
              size="m"
              backgroundColor={themeColor}
              color={PALETTE.WHITE}
              onClick={() => setFormOpen(!formOpen)}
            >
              <MdAdd size="1.5rem" />
            </RoundButton>
          </>
        ) : (
          <p>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</p>
        )}
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Form onSubmit={onLineSubmit}>
          <InputContainer
            labelText="노선 이름"
            validation={{ text: lineNameErrorMessage, isValid: false }}
          >
            <Input value={lineName} onChange={onlineNameChange} />
          </InputContainer>
          <StationSelects>
            <div>
              <InputContainer labelText="상행 종점">
                <Select value={upStationId} onChange={onUpStationIdChange}>
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
                <Select value={downStationId} onChange={onDownStationIdChange}>
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
            <Input value={distance} onChange={onDistanceChange} />
          </InputContainer>
          <InputContainer labelText="색상을 선택하세요 (이미 등록된 색상은 선택할 수 없습니다.)">
            <Palette inputName={'color'} colors={colors} />
          </InputContainer>
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
        {lines.length === 0 ? (
          <img src={noLine} alt="노선이 없습니다." />
        ) : (
          <List>
            {lines.map(({ id, name }) => (
              <li key={id}>
                <p>{name}</p>
                {isLoggedIn && (
                  <Button
                    type="button"
                    size="s"
                    backgroundColor={PALETTE.PINK}
                    color={PALETTE.WHITE}
                    onClick={() => onLineDelete(id, name)}
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
