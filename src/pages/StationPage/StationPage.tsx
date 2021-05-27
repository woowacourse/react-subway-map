import { useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdSubway, MdDelete } from 'react-icons/md';

import { Box, Button, Input, InputContainer } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PALETTE from '../../constants/palette';
import { ERROR_MESSAGE, SUCCESS_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import apiRequest, { APIReturnTypeStation } from '../../request';
import { Container, Icon, Heading1, Form, Text, List } from './StationPage.style';
import noStation from '../../assets/images/no_station.png';
import { PageProps } from '../types';

const BEFORE_FETCH: APIReturnTypeStation[] = []; // FETCH 이전과 이후의 빈 배열을 구분

const StationPage = ({ setIsLoading }: PageProps) => {
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const [list, setList] = useState<APIReturnTypeStation[]>(BEFORE_FETCH);
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState<string>('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;

  const fetchStations = async () => {
    const stations: APIReturnTypeStation[] = await apiRequest.getStations();

    setList(stations);
  };

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await fetchStations();
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
      setList([]);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (list === BEFORE_FETCH) {
    return <></>;
  }

  // TODO: 역 리스트 sorting
  const onStationNameSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isStationInputValid =
      stationInput.length > 1 && stationInput.length < 21 && /^[가-힣0-9]+$/.test(stationInput);
    const isStationInputDuplicated = list.some((item) => item.name === stationInput);

    if (!isStationInputValid) {
      setStationInputErrorMessage(ERROR_MESSAGE.INVALID_STATION_INPUT);
      return;
    }

    if (isStationInputDuplicated) {
      setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
      return;
    }

    setStationInputErrorMessage('');

    try {
      const newStation: APIReturnTypeStation | undefined = await apiRequest.addStation({
        name: stationInput,
      });

      if (newStation) {
        await fetchData();
        addMessage?.(SUCCESS_MESSAGE.ADD_STATION);
      } else {
        addMessage?.(ERROR_MESSAGE.UNAUTHORIZED);
      }

      setStationInput('');
    } catch (error) {
      console.error(error);
      // TODO: bad request처리
      if (error.message === '400') {
        setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
        await fetchData();
        return;
      }
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const onStationDelete = async (id: number, name: string) => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_STATION(name))) return;
    try {
      await apiRequest.deleteStation(id);
      await fetchData();
      addMessage?.(SUCCESS_MESSAGE.DELETE_STATION);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  return (
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
        {list.length === 0 ? (
          <img src={noStation} alt="지하철 역 없음 이미지" />
        ) : (
          <List aria-label="역 목록">
            {list.map(({ id, name }) => (
              <li key={id}>
                <p>{name}</p>
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
          </List>
        )}
      </Box>
    </Container>
  );
};

export default StationPage;
