import { useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdSubway, MdDelete } from 'react-icons/md';

import { Box, Button, Input, InputContainer, Heading1, Icon, Chip } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PALETTE from '../../constants/palette';
import REGEX from '../../constants/regex';
import { STATION_VALUE } from '../../constants/values';
import { ERROR_MESSAGE, SUCCESS_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import useStations from '../../hooks/useStations';
import { APIResponseDataStation } from '../../apis/station';

import { isValidLength } from '../../utils/validator';

import { Container, Form, Text, StationList } from './StationPage.style';
import noStation from '../../assets/images/no_station.png';
import { PageProps } from '../types';
import ERROR_TYPE from '../../constants/errorType';

const STATION_BEFORE_FETCH: APIResponseDataStation[] = []; // FETCH 이전과 이후의 빈 배열을 구분

const StationPage = ({ setIsLoading }: PageProps) => {
  const [stations, setStations, fetchStations, addStation, deleteStation, stationRequestError] =
    useStations(STATION_BEFORE_FETCH);
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState<string>('');

  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE_100;
  const addSnackBar = useContext(SnackBarContext)?.addMessage;

  const fetchData = async () => {
    // 요청이 빠르게 끝나는 경우 로딩화면을 띄우지 않기 위함.
    const timer = setTimeout(() => setIsLoading(true), 500);
    const response = await fetchStations();

    if (!response) {
      console.error(stationRequestError);
      addSnackBar?.(stationRequestError.message);
      setStations([]);
    }

    clearTimeout(timer);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (stations === STATION_BEFORE_FETCH) {
    return <></>;
  }

  const formValidator = () => {
    const isStationInputValid =
      isValidLength(stationInput, STATION_VALUE.NAME_MIN_LENGTH, STATION_VALUE.NAME_MAX_LENGTH) &&
      REGEX.KOREAN_DIGIT.test(stationInput);
    const isStationInputDuplicated = stations.some((item) => item.name === stationInput);

    if (!isStationInputValid) {
      setStationInputErrorMessage(ERROR_MESSAGE.INVALID_STATION_INPUT);
      return false;
    }

    if (isStationInputDuplicated) {
      setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
      return false;
    }

    setStationInputErrorMessage('');
    return true;
  };

  const onStationNameSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isValidForm = formValidator();

    if (!isValidForm) {
      return;
    }

    const response = await addStation({ name: stationInput });

    if (response) {
      await fetchData();
      addSnackBar?.(SUCCESS_MESSAGE.ADD_STATION);
      setStationInput('');
      return;
    }

    console.error(stationRequestError);

    if (stationRequestError.type === ERROR_TYPE.DUPLICATED) {
      setStationInputErrorMessage(stationRequestError.message);
      await fetchData();
      return;
    }

    addSnackBar?.(stationRequestError.message);

    if (stationRequestError.type === ERROR_TYPE.UNAUTHORIZED) {
      setIsLoggedIn?.(false);
      return;
    }
  };

  const onStationDelete = async (id: number, name: string) => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_STATION(name))) return;

    const response = await deleteStation(id);

    if (!response) {
      console.error(stationRequestError);
      addSnackBar?.(stationRequestError.message);

      if (stationRequestError.type === ERROR_TYPE.UNAUTHORIZED) {
        setIsLoggedIn?.(false);
      }

      return;
    }

    await fetchData();
    addSnackBar?.(SUCCESS_MESSAGE.DELETE_STATION);
    return;
  };

  return (
    <Container>
      <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE_100}>
        <Heading1>지하철 역 관리</Heading1>
        {isLoggedIn ? (
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
              color={PALETTE.WHITE_100}
            >
              추가
            </Button>
          </Form>
        ) : (
          <Text>추가 및 삭제 기능을 이용하시려면 로그인해주세요 🙂</Text>
        )}
      </Box>
      <Box backgroundColor={PALETTE.WHITE_100}>
        {stations.length === 0 ? (
          <img src={noStation} alt="지하철 역 없음 이미지" />
        ) : (
          <StationList aria-label="역 목록">
            {stations.map(({ id, name, lines }) => (
              <li key={id}>
                <p>
                  {name}
                  {lines?.map(({ id, name, color }) => (
                    <Chip key={id} size="s" backgroundColor={color}>
                      {name}
                    </Chip>
                  ))}
                </p>
                {isLoggedIn && (
                  <Button
                    type="button"
                    size="s"
                    backgroundColor={PALETTE.PINK_100}
                    color={PALETTE.WHITE_100}
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
