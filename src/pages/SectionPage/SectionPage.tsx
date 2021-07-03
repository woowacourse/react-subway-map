import { useContext, useState } from 'react';
import { MdAdd, MdArrowForward, MdDelete } from 'react-icons/md';

import {
  Box,
  Button,
  Input,
  Select,
  InputContainer,
  RoundButton,
  Heading1,
  Icon,
  ErrorText,
  List,
  ColorDot,
} from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';

import PALETTE from '../../constants/palette';

import useSections from '../../hooks/useSections';
import noSelectedLine from '../../assets/images/no_selected_line.png';
import { Line, Station } from '../../types';
import { Container, TitleBox, Form, FormBox, StationSelects, Distance } from './SectionPage.style';

const LINE_BEFORE_FETCH: Line[] = []; // FETCH 이전과 이후의 빈 배열을 구분
const STATION_BEFORE_FETCH: Station[] = [];

const SectionPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { stations, lines, currentLine, formValue, handler, validation } = useSections(
    STATION_BEFORE_FETCH,
    LINE_BEFORE_FETCH
  );
  const { upStationId, downStationId, distance } = formValue;
  const {
    onLineSelect,
    onUpStationIdChange,
    onDownStationIdChange,
    onDistanceChange,
    onSectionSubmit,
    onSectionDelete,
  } = handler;

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const { isLoggedIn } = useContext(UserContext) ?? {};

  return lines === LINE_BEFORE_FETCH || stations === STATION_BEFORE_FETCH ? (
    <></>
  ) : (
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
        <InputContainer labelText="노선 선택">
          <ColorDot size="s" backgroundColor={currentLine?.color} />
          <Select onChange={onLineSelect} aria-label="노선 선택">
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
        <Form
          onSubmit={(event) => {
            onSectionSubmit(event);
            setFormOpen(false);
          }}
        >
          <StationSelects>
            <div>
              <InputContainer labelText="상행역">
                <Select value={upStationId} onChange={onUpStationIdChange} aria-label="상행역 선택">
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
              <InputContainer labelText="하행역">
                <Select
                  value={downStationId}
                  onChange={onDownStationIdChange}
                  aria-label="하행역 선택"
                >
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
            <ErrorText>{validation.stationSelect.text}</ErrorText>
          </StationSelects>
          <InputContainer labelText="거리 (단위:km)" validation={validation.distance}>
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
