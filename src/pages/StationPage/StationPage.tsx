import { ChangeEvent, useContext, useEffect, useState, FormEventHandler } from 'react';
import { MdSubway, MdEdit, MdCancel, MdDelete, MdCheck } from 'react-icons/md';

import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import PALETTE from '../../constants/palette';
import Input from '../../components/shared/Input/Input';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { Container, Icon, Heading1, Form, List } from './StationPage.style';
import useInput from '../../hooks/useInput';
import apiRequest, { APIReturnTypeStation } from '../../request';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

interface Station extends APIReturnTypeStation {
  editable: boolean;
}

const StationPage = () => {
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const [list, setList] = useState<Station[]>([]);
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState<string>('');

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;

  useEffect(() => {
    const getStations = async () => {
      try {
        const stations: APIReturnTypeStation[] = await apiRequest.getStations();

        setList(stations.map((station) => ({ ...station, editable: false })));
      } catch (error) {
        console.error(error);
        addMessage?.(ERROR_MESSAGE.DEFAULT);
      }
    };

    getStations();
  }, []);

  // TODO: 여러 사용자가 동시에 데이터를 추가할 때 일관성 유지
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
        setList([{ ...newStation, editable: false }, ...list]);
        addMessage?.(SUCCESS_MESSAGE.ADD_STATION);
      } else {
        addMessage?.(ERROR_MESSAGE.UNAUTHORIZED);
      }

      setStationInput('');
    } catch (error) {
      console.error(error);
      // TODO: bad request처리
      if (error.status === '400') {
        setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
        return;
      }
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  };

  const onNameChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    setList((prevList) =>
      prevList.map((station) => {
        if (station.id === id) {
          return {
            ...station,
            name: event.target.value,
          };
        }

        return {
          ...station,
        };
      })
    );
  };

  const onSetEditable = (id: number, editable: boolean) => {
    setList((prevList) =>
      prevList.map((station) => {
        if (station.id === id) {
          return {
            ...station,
            editable,
          };
        }

        return {
          ...station,
        };
      })
    );
  };

  const onEditStation = async () => {};

  return (
    <Container>
      <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 역 관리</Heading1>
        <Form onSubmit={onStationNameSubmit}>
          <InputContainer
            labelText="지하철 역 이름을 입력하세요"
            validation={{ text: stationInputErrorMessage, isValid: false }}
          >
            <Icon>
              <MdSubway size="1.5rem" />
            </Icon>
            <Input type="text" value={stationInput} onChange={onStationInputChange} />
          </InputContainer>
          <Button size="m" width="6rem" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
        </Form>
      </Box>
      <Box backgroundColor={PALETTE.WHITE}>
        <List>
          {list.map(({ id, name, editable }) => (
            <li key={id}>
              <Input
                value={name}
                onChange={(event) => onNameChange(id, event)}
                readOnly={!editable}
              />
              {editable ? (
                <Button
                  type="button"
                  size="s"
                  backgroundColor={themeColor}
                  color={PALETTE.WHITE}
                  onClick={onEditStation}
                >
                  <MdCheck size="15px" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="s"
                  backgroundColor={PALETTE.GRAY_100}
                  onClick={() => onSetEditable(id, true)}
                >
                  <MdEdit size="15px" />
                </Button>
              )}
              {editable ? (
                <Button
                  type="button"
                  size="s"
                  backgroundColor={PALETTE.GRAY_100}
                  onClick={() => onSetEditable(id, false)}
                >
                  <MdCancel size="15px" />
                </Button>
              ) : (
                <Button type="button" size="s" backgroundColor={PALETTE.PINK} color={PALETTE.WHITE}>
                  <MdDelete size="15px" />
                </Button>
              )}
            </li>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default StationPage;
export type { Station };
