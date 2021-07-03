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
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import REGEX from '../../constants/regex';
import PALETTE from '../../constants/palette';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/messages';
import { LINE_VALUE } from '../../constants/values';

import useInput from '../../hooks/useInput';
import useStations from '../../hooks/useStations';
import useLines from '../../hooks/useLines';

import noLine from '../../assets/images/no_line.png';
import { Container, TitleBox, FormBox, Form, StationSelects } from './LinePage.style';
import { Line, Station } from '../../types';
import { LoadingContext } from '../../contexts/LoadingContext';

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

const LINE_BEFORE_FETCH: Line[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: Station[] = [];

const LinePage = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const { stations, fetchStations } = useStations(STATION_BEFORE_FETCH);
  const { lines, fetchLines, addLine, deleteLine } = useLines(LINE_BEFORE_FETCH);
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
  const { isLoggedIn } = useContext(UserContext) ?? {};
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

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

  useEffect(() => {
    callWithLoading?.(Promise.all, [fetchStations(), fetchLines()]);
  }, []);

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
    reset();
    setFormOpen(false);
  };

  const onLineDelete = async (id: number, name: string) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_LINE(name))) return;

    await deleteLine(id);
  };

  return lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH ? (
    <></>
  ) : (
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
              aria-label="노선 추가"
            >
              <MdAdd size="1.5rem" />
            </RoundButton>
          </>
        ) : (
          <p>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</p>
        )}
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Form onSubmit={onLineSubmit} aria-label="노선 추가 양식">
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
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
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
                    backgroundColor={PALETTE.PINK}
                    color={PALETTE.WHITE}
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
