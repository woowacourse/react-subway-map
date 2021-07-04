import { useContext, useEffect, useMemo, useState } from 'react';
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
import { UserContext } from '../../contexts/UserContextProvider';

import PALETTE from '../../constants/palette';

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
  const { stations, fetchStations } = useStations(STATION_BEFORE_FETCH);
  const { lines, fetchLines, formValue, handler, validation } = useLines(LINE_BEFORE_FETCH);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { lineName, upStationId, downStationId, distance } = formValue;
  const {
    onLineNameChange,
    onDistanceChange,
    onUpStationIdChange,
    onDownStationIdChange,
    onLineSubmit,
    onLineDelete,
  } = handler;

  const colors = useMemo(() => {
    const usedLineColors = lines.map((line) => line.color);

    return lineColors.map((color) => ({
      name: color,
      disabled: usedLineColors.includes(color),
    }));
  }, [lines]);

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const { isLoggedIn } = useContext(UserContext) ?? {};
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  useEffect(() => {
    callWithLoading?.(Promise.all.bind(Promise), [fetchStations(), fetchLines()]);
  }, [callWithLoading, fetchLines, fetchStations]);

  return lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH ? (
    <></>
  ) : (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE} isOpen={isFormOpen}>
        <Heading1>지하철 노선 관리</Heading1>
        {isLoggedIn ? (
          <>
            <p>노선을 추가하시려면 '+' 버튼을 눌러주세요</p>
            <RoundButton
              type="button"
              size="m"
              backgroundColor={themeColor}
              color={PALETTE.WHITE}
              onClick={() => setIsFormOpen(!isFormOpen)}
              aria-label="노선 추가"
            >
              <MdAdd size="1.5rem" />
            </RoundButton>
          </>
        ) : (
          <p>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</p>
        )}
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE} isOpen={isFormOpen}>
        <Form
          onSubmit={(event) => {
            onLineSubmit(event);
            setIsFormOpen(false);
          }}
          aria-label="노선 추가 양식"
        >
          <InputContainer labelText="노선 이름" validation={validation.lineName}>
            <Input
              value={lineName}
              onChange={onLineNameChange}
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
            <ErrorText>{validation.stationSelect.text}</ErrorText>
          </StationSelects>
          <InputContainer labelText="거리 (단위:km)" validation={validation.distance}>
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
