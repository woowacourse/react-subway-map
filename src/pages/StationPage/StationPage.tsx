import { ChangeEvent, useContext, useRef, useState } from 'react';
import { MdSubway, MdEdit, MdCancel, MdDelete, MdCheck } from 'react-icons/md';

import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import PALETTE from '../../constants/palette';
import Input from '../../components/shared/Input/Input';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { Container, Icon, Heading1, Form, List } from './StationPage.style';
import useInput from '../../hooks/useInput';

interface Station {
  id: number;
  name: string;
  editable: boolean;
}

const initialList: Station[] = [
  {
    id: 1,
    name: '지하철역지하철역지하철역지하철역지하철역',
    editable: false,
  },
  {
    id: 2,
    name: '한티역',
    editable: false,
  },
  {
    id: 3,
    name: '미역',
    editable: false,
  },
  {
    id: 4,
    name: '지하철역지하철역지하철역지하철역지하철역',
    editable: false,
  },
  {
    id: 5,
    name: '한티역',
    editable: false,
  },
];

const StationPage = () => {
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const [list, setList] = useState<Station[]>(initialList);
  const [stationInput, onStationInputChange] = useInput('');

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

  const setEditable = (id: number, editable: boolean) => {
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

  const onEditStation = () => {};

  return (
    <Container>
      <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 역 관리</Heading1>
        <Form>
          <InputContainer labelText="지하철 역 이름을 입력하세요">
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
                  onClick={() => setEditable(id, true)}
                >
                  <MdEdit size="15px" />
                </Button>
              )}
              {editable ? (
                <Button
                  type="button"
                  size="s"
                  backgroundColor={PALETTE.GRAY_100}
                  onClick={() => setEditable(id, false)}
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
