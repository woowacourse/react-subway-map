import { useContext, useEffect, useMemo, useState, FormEventHandler } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

import Palette from '../../components/Palette/Palette';
import {
  Box,
  Button,
  Input,
  RoundButton,
  InputContainer,
  Heading1,
  List,
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import PALETTE from '../../constants/palette';
import STATUS_CODE from '../../constants/statusCode';
import { CONFIRM_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import useStations, { APIReturnTypeStation } from '../../hooks/useStations';
import useLines, { APIReturnTypeLine } from '../../hooks/useLines';

import noLine from '../../assets/images/no_line.png';
import { PageProps } from '../types';
import { Container, TitleBox, FormBox, Form } from './LinePage.style';
import {
  lineNameErrorMessage,
  distanceErrorMessage,
  isFormCompleted,
} from '../../utils/validations/lineValidation';
import StationSelects from './StationSelects';

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
  const [stations, setStations, fetchStations] = useStations(STATION_BEFORE_FETCH);
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine] = useLines(LINE_BEFORE_FETCH);
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

  useEffect(() => {
    fetchData();
  }, []);

  const resetLineForm = () => {
    setLineName('');
    setUpStationId('');
    setDownStationId('');
    setDistance('');
    setFormOpen(false);
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

  if (lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH) {
    return <></>;
  }

  const onLineSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const lineForm = event.currentTarget;
    const color = lineForm['color'].value;

    if (!isFormCompleted(lines, { lineName, upStationId, downStationId, distance }) || !color) {
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

      await addLine(newLine);

      addMessage?.(SUCCESS_MESSAGE.ADD_LINE);
      lineForm.reset(); // for color reset
      resetLineForm();

      await fetchData();
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
      await deleteLine(id);
      addMessage?.(SUCCESS_MESSAGE.DELETE_LINE);
      await fetchData();
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
            validation={{ text: lineNameErrorMessage(lines, lineName), isValid: false }}
          >
            <Input
              value={lineName}
              onChange={onlineNameChange}
              aria-label="지하철 노선 이름 입력"
            />
          </InputContainer>
          <StationSelects
            stations={stations}
            upStationId={upStationId}
            setUpStationId={setUpStationId}
            downStationId={downStationId}
            setDownStationId={setDownStationId}
          />
          <InputContainer
            labelText="거리 (단위:km)"
            validation={{ text: distanceErrorMessage(distance), isValid: false }}
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
