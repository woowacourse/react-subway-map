import { useContext, useEffect, useMemo, useState } from 'react';
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
} from './LinePage.style';
import Palette from '../../components/Palette/Palette';
import apiRequest, { APIReturnTypeStation, APIReturnTypeLine } from '../../request';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { ERROR_MESSAGE } from '../../constants/messages';

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

  const colors = useMemo(() => {
    const usedLineColors = lines.map((line) => line.color);

    return lineColors.map((color) => ({
      name: PALETTE[color],
      disabled: usedLineColors.includes(color),
    }));
  }, [lines]);

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;

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
  // 추가

  // 삭제

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
        <Form>
          <InputContainer labelText="노선 이름">
            <Input />
          </InputContainer>
          <StationSelects>
            <InputContainer labelText="상행 종점">
              <Select>
                <option value="/" hidden>
                  역 선택
                </option>
                {stations.map((station) => (
                  <option value={station.id}>{station.name}</option>
                ))}
              </Select>
            </InputContainer>
            <Icon>
              <MdArrowForward size="1.5rem" />
            </Icon>
            <InputContainer labelText="하행 종점">
              <Select>
                <option value="/" hidden>
                  역 선택
                </option>
                {stations.map((station) => (
                  <option value={station.id}>{station.name}</option>
                ))}
              </Select>
            </InputContainer>
          </StationSelects>
          <InputContainer labelText="거리 (단위:km)">
            <Input />
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
              <Button type="button" size="s" backgroundColor={PALETTE.PINK} color={PALETTE.WHITE}>
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
