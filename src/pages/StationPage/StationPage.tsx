import { useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdSubway, MdDelete } from 'react-icons/md';

import { Box, Button, Input, InputContainer, Heading1, Icon, Chip } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import { LoadingContext } from '../../contexts/LoadingContext';

import PALETTE from '../../constants/palette';
import REGEX from '../../constants/regex';
import { STATION_VALUE } from '../../constants/values';
import { ERROR_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import useStations from '../../hooks/useStations';

import { Station } from '../../types';
import noStation from '../../assets/images/no_station.png';
import { Container, Form, Text, StationList } from './StationPage.style';

const STATION_BEFORE_FETCH: Station[] = []; // FETCH 이전과 이후의 빈 배열을 구분

const StationPage = () => {
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const { stations, fetchStations, addStation, deleteStation } = useStations(STATION_BEFORE_FETCH);
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState<string>('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  useEffect(() => {
    callWithLoading?.(fetchStations);
  }, []);

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

    const [isDuplicated, message] = (await addStation({ name: stationInput })) ?? [];

    if (isDuplicated) {
      setStationInputErrorMessage(message ?? '');
    }

    setStationInputErrorMessage('');
    setStationInput('');
  };

  const onStationDelete = async (id: number, name: string) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_STATION(name))) return;

    await deleteStation(id);
  };

  return stations === STATION_BEFORE_FETCH ? (
    <></>
  ) : (
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
            {stations.map(({ id, name, lines }) => (
              <li key={id}>
                <p>
                  {name}
                  {lines?.map(({ id, name, color }) => (
                    <Chip key={id} size="s" borderColor={color}>
                      {name}
                    </Chip>
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
