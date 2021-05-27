import { ChangeEventHandler, useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdAdd, MdArrowForward, MdDelete } from 'react-icons/md';

import { Box, Button, Input, Select, InputContainer, RoundButton } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import PALETTE from '../../constants/palette';
import REGEX from '../../constants/regex';
import { CONFIRM_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';
import { SECTION_VALUE } from '../../constants/values';

import useInput from '../../hooks/useInput';
import apiRequest, { APIReturnTypeLine, APIReturnTypeStation } from '../../request';
import { PageProps } from '../types';
import {
  Container,
  Icon,
  TitleBox,
  Heading1,
  Form,
  FormBox,
  List,
  StationSelects,
  Distance,
  StationSelectError,
} from './SectionPage.style';
import noSelectedLine from '../../assets/images/no_selected_line.png';

interface StationInLine extends APIReturnTypeStation {
  distance?: number;
}

const LINE_BEFORE_FETCH: APIReturnTypeLine[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: APIReturnTypeStation[] = [];

const SectionPage = ({ setIsLoading }: PageProps) => {
  const [selectedLineId, setSelectedLineId] = useState<number>(-1);

  const [stations, setStations] = useState<APIReturnTypeStation[]>(STATION_BEFORE_FETCH);
  const [lines, setLines] = useState<APIReturnTypeLine[]>(LINE_BEFORE_FETCH);

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;

  const currentLine = lines.find((line) => line.id === selectedLineId);
  const lastStation = currentLine?.sections[currentLine?.sections.length - 1].downStation;

  const stationsInLine: StationInLine[] = (() => {
    if (currentLine && lastStation) {
      return [
        ...currentLine.sections.map((section) => ({
          id: section.upStation.id,
          name: section.upStation.name,
          distance: section.distance,
        })),
        {
          id: lastStation.id,
          name: lastStation.name,
        },
      ];
    }

    return [];
  })();

  const isOnlyOneStationInCurrentLine = Boolean(
    Number(stationsInLine.some(({ id }) => id === Number(upStationId))) ^
      Number(stationsInLine.some(({ id }) => id === Number(downStationId)))
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

  const fetchLine = async (lineId: number) => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      const newLine = await apiRequest.getLine(lineId);
      clearTimeout(timer);

      setLines((prevLines) =>
        prevLines.map((line) => {
          if (line.id === lineId) {
            return newLine;
          }
          return line;
        })
      );
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    } finally {
      setIsLoading(false);
    }
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

    try {
      const newSection = {
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        distance: Number(distance),
      };

      await apiRequest.addSection(selectedLineId, newSection);

      addMessage?.(SUCCESS_MESSAGE.ADD_SECTION);
      await fetchLine(selectedLineId);

      reset();
      setFormOpen(false);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const deleteSection = async (stationId: number, stationName: string) => {
    if (stationId === -1 || stationName === '') return;

    if (currentLine?.sections.length === 1) {
      addMessage?.(ERROR_MESSAGE.SECTION_LENGTH_OUT_OF_RANGE);
      return;
    }

    if (!confirm(CONFIRM_MESSAGE.DELETE_SECTION(currentLine?.name ?? '', stationName))) {
      return;
    }

    try {
      await apiRequest.deleteSection(selectedLineId, stationId);

      addMessage?.(SUCCESS_MESSAGE.DELETE_SECTION);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }

    await fetchLine(selectedLineId);

    return stationId;
  };

  return (
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
            >
              <MdAdd size="1.5rem" />
            </RoundButton>
          </>
        ) : (
          <p>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</p>
        )}
        <InputContainer labelText="노선 선택">
          <Select onChange={onLineSelect}>
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
              <InputContainer labelText="상행 종점">
                <Select value={upStationId} onChange={onUpStationIdChange}>
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
              <InputContainer labelText="하행 종점">
                <Select value={downStationId} onChange={onDownStationIdChange}>
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
            <StationSelectError>{stationSelectErrorMessage}</StationSelectError>
          </StationSelects>
          <InputContainer
            labelText="거리 (단위:km)"
            validation={{ text: distanceErrorMessage, isValid: false }}
          >
            <Input value={distance} onChange={onDistanceChange} />
          </InputContainer>
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
        {!currentLine ? (
          <img src={noSelectedLine} alt="노선이 없습니다." />
        ) : (
          <List>
            {stationsInLine.map(({ id, name, distance }) => {
              return (
                <li key={id}>
                  <p>{name}</p>
                  {distance && <Distance>{`거리 : ${distance}`}</Distance>}
                  {isLoggedIn && (
                    <Button
                      type="button"
                      size="s"
                      backgroundColor={PALETTE.PINK}
                      color={PALETTE.WHITE}
                      onClick={() => deleteSection(id, name)}
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
