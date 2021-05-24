import { useContext, useState } from 'react';
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

const initialColors = [
  {
    name: PALETTE.PINK,
    disabled: false,
  },
  {
    name: PALETTE.RED,
    disabled: false,
  },
  {
    name: PALETTE.ORANGE,
    disabled: false,
  },
  {
    name: PALETTE.YELLOW,
    disabled: false,
  },
  {
    name: PALETTE.MALCHA,
    disabled: false,
  },
  {
    name: PALETTE.GREEN,
    disabled: false,
  },
  {
    name: PALETTE.SKYBLUE,
    disabled: false,
  },
  {
    name: PALETTE.BLUE,
    disabled: false,
  },
  {
    name: PALETTE.VIOLET,
    disabled: false,
  },
  {
    name: PALETTE.PURPLE,
    disabled: false,
  },
];

interface Line {
  id: number;
  name: string;
  color: string;
  stations: Array<{ id: number; name: string }>;
}

const initialList = [
  {
    id: 1,
    name: '신분당선',
    color: 'red lighten-1',
    stations: [
      { id: 1, name: '강남역' },
      { id: 2, name: '판교역' },
      { id: 3, name: '정자역' },
    ],
  },
  {
    id: 2,
    name: '2호선',
    color: 'green lighten-1',
    stations: [
      { id: 1, name: '강남역' },
      { id: 4, name: '역삼역' },
      { id: 5, name: '잠실역' },
    ],
  },
];

const LinePage = () => {
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [list, setList] = useState<Line[]>(initialList);

  // 색상

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
                <option value="Hi">안녕하세요</option>
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
              </Select>
            </InputContainer>
          </StationSelects>
          <InputContainer labelText="거리 (단위:km)">
            <Input />
          </InputContainer>
          <InputContainer labelText="색상을 선택하세요 (이미 등록된 색상은 선택할 수 없습니다.)">
            <Palette inputName={'color'} colors={initialColors} />
          </InputContainer>
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
        <List>
          {list.map(({ id, name }) => (
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
