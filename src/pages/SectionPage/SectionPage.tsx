import { ChangeEventHandler, useContext, useState } from 'react';
import { MdAdd, MdArrowForward, MdDelete } from 'react-icons/md';

import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import PALETTE from '../../constants/palette';
import Input from '../../components/shared/Input/Input';
import Select from '../../components/shared/Select/Select';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
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
} from './SectionPage.style';
import RoundButton from '../../components/shared/Button/RoundButton';

const initialList = [
  {
    id: 1,
    name: '신분당선',
    color: 'red',
    stations: [
      { id: 1, name: '강남역', distance: 10 },
      { id: 2, name: '판교역', distance: 6 },
      { id: 3, name: '정자역' },
    ],
  },
  {
    id: 2,
    name: '2호선',
    color: 'green',
    stations: [
      { id: 1, name: '강남역', distance: 6 },
      { id: 4, name: '역삼역', distance: 10 },
      { id: 5, name: '잠실역' },
    ],
  },
];

const SectionPage = () => {
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [list, setList] = useState(initialList);
  const [selectedLineId, setSelectedLineId] = useState<number>(-1);

  const currentLine = list.find((item) => item.id === selectedLineId);

  const onLineSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedLineId(Number(event.target.value));
  };

  const deleteStation = (stationId: number) => {
    // delete 요청 보내기
    // section 조회 한 번 더 가져와서 업데이트.(setList)
    return stationId;
  };

  return (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Heading1>지하철 구간 관리</Heading1>
        <InputContainer labelText="노선 선택">
          <Select onChange={onLineSelect}>
            <option value="/" hidden>
              노선 선택
            </option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </InputContainer>
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
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
          {/* TODO: 색상 팔레트 추가 */}
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
        <List>
          {currentLine?.stations.map((station) => {
            return (
              <li key={station.id}>
                <p>{station.name}</p>
                {station.distance && <Distance>{`거리 : ${station.distance}`}</Distance>}
                <Button
                  type="button"
                  size="s"
                  backgroundColor={PALETTE.PINK}
                  color={PALETTE.WHITE}
                  onClick={() => deleteStation(station.id)}
                >
                  <MdDelete size="15px" />
                </Button>
              </li>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default SectionPage;
