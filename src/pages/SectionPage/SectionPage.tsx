import { useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

import {
  Box,
  Button,
  Input,
  InputContainer,
  RoundButton,
  Heading1,
  List,
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import PALETTE from '../../constants/palette';
import { CONFIRM_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import useStations, { APIReturnTypeStation } from '../../hooks/useStations';
import useSections from '../../hooks/useSections';
import useLines, { APIReturnTypeLine } from '../../hooks/useLines';

import { PageProps } from '../types';
import { Container, TitleBox, Form, FormBox, Distance } from './SectionPage.style';
import noSelectedLine from '../../assets/images/no_selected_line.png';
import STATUS_CODE from '../../constants/statusCode';
import { distanceErrorMessage, isFormCompleted } from '../../utils/validations/sectionValidation';
import StationSelects from './StationSelects';
import LineSelect from './LineSelect';

const LINE_BEFORE_FETCH: APIReturnTypeLine[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: APIReturnTypeStation[] = [];

const SectionPage = ({ setIsLoading }: PageProps) => {
  const [selectedLineId, setSelectedLineId] = useState<number>(-1);

  const [stations, setStations, fetchStations] = useStations(STATION_BEFORE_FETCH);
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine] = useLines(LINE_BEFORE_FETCH);
  const [addSection, deleteSection] = useSections();

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, onDistanceChange, setDistance] = useInput('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext) ?? {};

  const currentLine = lines.find((line) => line.id === selectedLineId);

  const getLine = async (lineId: number) => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await fetchLine(lineId);
      clearTimeout(timer);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    } finally {
      setIsLoading(false);
    }
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

  const resetSectionForm = () => {
    setUpStationId('');
    setDownStationId('');
    setDistance('');
    setFormOpen(false);
  };

  const onSectionSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!currentLine) {
      addMessage?.(ERROR_MESSAGE.NO_LINE_SELECTED);
      return;
    }

    if (!isFormCompleted(currentLine, { upStationId, downStationId, distance })) {
      addMessage?.(ERROR_MESSAGE.INCOMPLETE_FORM);
      return;
    }

    try {
      const newSection = {
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        distance: Number(distance),
      };

      await addSection(selectedLineId, newSection);

      addMessage?.(SUCCESS_MESSAGE.ADD_SECTION);

      resetSectionForm();

      await fetchData();
      await getLine(selectedLineId);
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

  const onSectionDelete = async (stationId: number, stationName: string) => {
    if (stationId === -1 || stationName === '') return;

    if (currentLine?.stations.length === 1) {
      addMessage?.(ERROR_MESSAGE.SECTION_LENGTH_OUT_OF_RANGE);
      return;
    }

    if (!confirm(CONFIRM_MESSAGE.DELETE_SECTION(currentLine?.name ?? '', stationName))) {
      return;
    }

    try {
      await deleteSection(selectedLineId, stationId);

      addMessage?.(SUCCESS_MESSAGE.DELETE_SECTION);
      await fetchData();
      await getLine(selectedLineId);
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
        <LineSelect lines={lines} currentLine={currentLine} setSelectedLineId={setSelectedLineId} />
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Form onSubmit={onSectionSubmit}>
          <StationSelects
            stations={stations}
            currentLine={currentLine}
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
