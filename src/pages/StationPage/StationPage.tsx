import { useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdSubway, MdDelete } from 'react-icons/md';

import { Box, Button, Input, InputContainer, Heading1, Icon, Chip } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PALETTE from '../../constants/palette';
import STATUS_CODE from '../../constants/statusCode';
import { ERROR_MESSAGE, SUCCESS_MESSAGE, CONFIRM_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import useStations, { APIReturnTypeStation } from '../../hooks/useStations';

import { Container, Form, Text, StationList } from './StationPage.style';
import noStation from '../../assets/images/no_station.png';
import { PageProps } from '../types';
import {
  isStationInputDuplicated,
  isStationInputValid,
} from '../../utils/validations/stationValidation';

const StationPage = ({ setIsLoading }: PageProps) => {
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const [stations, setStations, fetchStations, addStation, deleteStation] = useStations(null);
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await fetchStations();
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
      setStations([]);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (stations === null) {
    return <></>;
  }

  const onStationNameSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isStationInputValid(stationInput)) {
      setStationInputErrorMessage(ERROR_MESSAGE.INVALID_STATION_INPUT);
      return;
    }

    if (isStationInputDuplicated(stations, stationInput)) {
      setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
      await fetchData();
      return;
    }

    setStationInputErrorMessage('');

    try {
      await addStation({ name: stationInput });
      addMessage?.(SUCCESS_MESSAGE.ADD_STATION);
      await fetchData();

      setStationInput('');
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addMessage?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);
        return;
      }

      if (error.message === STATUS_CODE.STATION_DUPLICATED) {
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
      await deleteStation(id);
      addMessage?.(SUCCESS_MESSAGE.DELETE_STATION);
      await fetchData();
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        addMessage?.(ERROR_MESSAGE.TOKEN_EXPIRED);
        setIsLoggedIn?.(false);
        return;
      }

      if (error.message === STATUS_CODE.STATION_IN_SECTION) {
        addMessage?.(ERROR_MESSAGE.STATION_IN_SECTION);
        await fetchData();
        return;
      }

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
