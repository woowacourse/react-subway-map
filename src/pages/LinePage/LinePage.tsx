import {
  useContext,
  useEffect,
  useMemo,
  useState,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import { MdAdd, MdArrowForward, MdEdit, MdDelete } from 'react-icons/md';

import Box from '../../components/shared/Box/Box';
import RoundButton from '../../components/shared/Button/RoundButton';
import Button from '../../components/shared/Button/Button';
import Input from '../../components/shared/Input/Input';
import Select from '../../components/shared/Select/Select';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import PALETTE from '../../constants/palette';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import {
  Container,
  Icon,
  Heading1,
  TitleBox,
  FormBox,
  Form,
  List,
  StationSelects,
  StationSelectError,
} from './LinePage.style';
import Palette from '../../components/Palette/Palette';
import apiRequest, { APIReturnTypeStation, APIReturnTypeLine } from '../../request';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { CONFIRM_MESSAGE, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';
import useInput from '../../hooks/useInput';

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

const LinePage = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [stations, setStations] = useState<APIReturnTypeStation[]>([]);
  const [lines, setLines] = useState<APIReturnTypeLine[]>([]);
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

  // TODO: 매직넘버 싹 다 ㄱ
  const isLineNameValid =
    lineName.length > 1 && lineName.length < 11 && /^[가-힣0-9]+$/.test(lineName);
  const isLineNameDuplicated = lines.some((item) => item.name === lineName);
  const isStationSelectDuplicated = upStationId === downStationId;
  const isDistanceValid =
    /^[0-9]+$/.test(distance) && Number(distance) > 0 && Number(distance) < 301;

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
    try {
      const newLines: APIReturnTypeLine[] = await apiRequest.getLines();

      setLines(newLines);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const fetchStations = async () => {
    try {
      const newStations: APIReturnTypeStation[] = await apiRequest.getStations();

      setStations(newStations);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  useEffect(() => {
    fetchStations();
    fetchLines();
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
      await fetchLines();

      reset();
      formElement.reset();
      setFormOpen(false);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const onLineDelete = async (id: number, name: string) => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_LINE(name))) return;
    try {
      await apiRequest.deleteLine(id);
      await fetchLines();
      addMessage?.(SUCCESS_MESSAGE.DELETE_LINE);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  return (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Heading1>지하철 노선 관리</Heading1>
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
            <StationSelectError>{stationSelectErrorMessage}</StationSelectError>
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
        <List>
          {lines.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
              <Button type="button" size="s" backgroundColor={PALETTE.GRAY_100}>
                <MdEdit size="15px" />
              </Button>
              <Button
                type="button"
                size="s"
                backgroundColor={PALETTE.PINK}
                color={PALETTE.WHITE}
                onClick={() => onLineDelete(id, name)}
              >
                <MdDelete size="15px" />
              </Button>
            </li>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default LinePage;
