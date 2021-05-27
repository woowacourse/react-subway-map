import { useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdSubway, MdDelete } from 'react-icons/md';

import {
  Box,
  Button,
  Input,
  InputContainer,
  Heading1,
  Icon,
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PALETTE from '../../constants/palette';
import STATUS_CODE from '../../constants/statusCode';
import REGEX from '../../constants/regex';
import { STATION_VALUE } from '../../constants/values';
import { ERROR_MESSAGE, SUCCESS_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import useStations, { APIReturnTypeStation } from '../../hooks/useStations';
import useLines, { APIReturnTypeLine } from '../../hooks/useLines';

import { Container, Form, Text, StationList, LineCategory } from './StationPage.style';
import noStation from '../../assets/images/no_station.png';
import { PageProps } from '../types';

const getLineStationTable = (lines: APIReturnTypeLine[]) => {
  return lines.map((line) => ({
    id: line.id,
    name: line.name,
    color: line.color,
    stations: [
      ...line.sections.map((section) => section.upStation.id),
      line.sections[line.sections.length - 1].downStation.id,
    ],
  }));
};

const getProcessedStations = (stations: APIReturnTypeStation[], lines: APIReturnTypeLine[]) => {
  const lineStationTable = getLineStationTable(lines);

  const result = stations.map(({ id, name }) => {
    const lineColors = lineStationTable
      .filter((line) => line.stations.includes(id))
      .map((line) => line.color);

    return { id, name, lineColors };
  });

  return result;
};

const LINE_BEFORE_FETCH: APIReturnTypeLine[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: APIReturnTypeStation[] = [];

const StationPage = ({ setIsLoading }: PageProps) => {
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const [stations, setStations, fetchStations, addStation, deleteStation] =
    useStations(STATION_BEFORE_FETCH);
  const [lines, setLines, fetchLines] = useLines(LINE_BEFORE_FETCH);
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState<string>('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

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

  const onStationNameSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isStationInputValid =
      stationInput.length >= STATION_VALUE.NAME_MIN_LENGTH &&
      stationInput.length <= STATION_VALUE.NAME_MAX_LENGTH &&
      REGEX.KOREAN_DIGIT.test(stationInput);
    const isStationInputDuplicated = stations.some((item) => item.name === stationInput);

    if (!isStationInputValid) {
      setStationInputErrorMessage(ERROR_MESSAGE.INVALID_STATION_INPUT);
      return;
    }

    if (isStationInputDuplicated) {
      setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
      return;
    }

    setStationInputErrorMessage('');

    try {
      await addStation({ name: stationInput });
      await fetchData();
      addMessage?.(SUCCESS_MESSAGE.ADD_STATION);

      setStationInput('');
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addMessage?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);
        return;
      }

      if (error.message === STATUS_CODE.STATION_DUPLICATED) {
        setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
        await fetchData();

        return;
      }

      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const onStationDelete = async (id: number, name: string) => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_STATION(name))) return;

    try {
      await deleteStation(id);
      await fetchData();
      addMessage?.(SUCCESS_MESSAGE.DELETE_STATION);
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addMessage?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);
        return;
      }

      if (error.message === STATUS_CODE.STATION_IN_SECTION) {
        addMessage?.(ERROR_MESSAGE.STATION_IN_SECTION);
        return;
      }

      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  return (
    <Container>
      <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 역 관리</Heading1>
        {isLoggedIn && (
          <Form onSubmit={onStationNameSubmit}>
            <InputContainer
              labelText="지하철 역 이름을 입력하세요"
              validation={{ text: stationInputErrorMessage, isValid: false }}
            >
              <Icon>
                <MdSubway size="1.5rem" />
              </Icon>
              <Input
                type="text"
                value={stationInput}
                onChange={onStationInputChange}
                aria-label="지하철 역 이름 입력"
              />
            </InputContainer>
            <Button
              size="m"
              width="6rem"
              height="2.8rem"
              backgroundColor={themeColor}
              color={PALETTE.WHITE}
            >
              추가
            </Button>
          </Form>
        )}
        {!isLoggedIn && <Text>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</Text>}
      </Box>
      <Box backgroundColor={PALETTE.WHITE}>
        {stations.length === 0 ? (
          <img src={noStation} alt="지하철 역 없음 이미지" />
        ) : (
          <StationList aria-label="역 목록">
            <LineCategory>
              {getLineStationTable(lines).map(({ id, name, color }) => (
                <div key={id}>
                  <ColorDot key={color} size="s" backgroundColor={color} />
                  <span>{name}</span>
                </div>
              ))}
            </LineCategory>
            {getProcessedStations(stations, lines).map(({ id, name, lineColors }) => (
              <li key={id}>
                <p>
                  {name}
                  {lineColors.map((color) => (
                    <ColorDot key={color} size="s" backgroundColor={color} />
                  ))}
                </p>

                {isLoggedIn && (
                  <Button
                    type="button"
                    size="s"
                    backgroundColor={PALETTE.PINK}
                    color={PALETTE.WHITE}
                    aria-label={`${name} 삭제`}
                    onClick={() => onStationDelete(id, name)}
                  >
                    <MdDelete size="15px" />
                  </Button>
                )}
              </li>
            ))}
          </StationList>
        )}
      </Box>
    </Container>
  );
};

export default StationPage;
